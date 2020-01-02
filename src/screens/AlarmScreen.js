import React from "react"
import firebase from "firebase";
import SendAlertButton from "../components/Alert/SendAlertButton";
import DisplaySentAlert from "../components/Alert/DisplaySentAlert";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {StyleSheet, Dimensions, View} from "react-native";
import HeaderIcon from "../components/HeaderIcon";
import Colors from "../constants/Colors";

export default class AlarmScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alertSentAt: 0,
            alertSendingDelay: 5,
            displayPopup: false,
            canLaunchAlert: false,
        }
    }

    componentWillMount() {
        this._getLocationAsync();
    }

    componentDidMount = () => {
        // Retrieve the current user
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({
                    user: user
                });
                this._checkAlerts(this.state.user);
            }
        });
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location });
    };

    _prepareAlert = () => {
        if(this.state.canLaunchAlert === true) {
            // Set display popup to true
            this.setState({
                displayPopup: true
            });
        }
    }

    _cancelAlert = () => {
        this.setState({
            displayPopup: false,
            alertSendingDelay: 5,
        })
    }

    _closeAlert = (alertId) => {

        // Firebase references
        const database = firebase.database();

        // Single alert reference
        const alertReference = database.ref("alerts/" + alertId);

        // Check if the alert is found first, then update it
        if(alertReference !== false || typeof(alertReference) === "undefined") {

            // Update the status
            alertReference.update({
                status: "closed"
            }).then(
                () => {
                    alertReference.once('value', (alertObject) => {
                        if(alertObject.val().status === "closed") {
                            alert("Vous êtes désormais considéré comme étant en sécurité.");
                        }
                    });
                }
            );
        } else {
            alert("Il semblerait que votre alerte soit introuvable. Veuillez réessayer.");
        }

        // Hide the confirmation popup
        this.setState({
            displayPopup: false
        });
    }

    _skipAlertDelay = () => {
        this.setState({
            alertSendingDelay: 0,
            displayPopup: false
        }, () => {
            this._sendAlert()
        });
    }

    _sendAlert = () => {

        if(this.state.canLaunchAlert === true) {

            // Firebase references
            const rootReference = firebase.database().ref();
            const alertsReference = rootReference.child("alerts");

            // UNIX timestamp where alert was send (without milliseconds)
            let sendingTime = Math.floor(new Date().getTime() / 1000);
            alertsReference.push({
                "emitter": this.state.user.uid,
                "helpers": null,
                "status": "started",
                "location": {
                    "latitude": this.state.location.coords.latitude,
                    "longitude": this.state.location.coords.longitude
                },
                "sendAt": sendingTime
            }).then((alertObject) => {
                this.setState({
                    buttonIsDisabled: true,
                    canLaunchAlert: false,
                    alertSentAt: sendingTime,
                    alertId: alertObject.key
                });
            }).catch(error => {
                alert(error.message);
            });

        }
    };

    _checkAlerts = (user) => {

        // Check if alert is already launched by current user
        // Set to true by default
        let allowAlertSending = true;
        let userId = user.uid;
        let alertId = 0;
        let alertSendingTime = 0;

        // Firebase references
        const database = firebase.database();
        const alertsReference = database.ref("alerts");

        alertsReference.on('value', (alerts) => {

            // When values are found in alerts table,
            // loop through each alert
            alerts.forEach((alertObject) => {
                let emitterId = alertObject.val().emitter;
                let alertSentStatus = ["started", "open", "confirmed"];

                // If the current user is found as emitter of an alert,
                // disable the sending of alerts and retrieve the sent alert details
                if(emitterId === userId) {
                    allowAlertSending = (alertSentStatus.includes(alertObject.val().status)) ? false : true;
                    alertSendingTime = alertObject.val().sendAt;
                    alertId = alertObject.key;
                };
            });

            // Update the state
            this.setState({
                canLaunchAlert: allowAlertSending,
                alertSendingDelay: 5, // Reset the countdown
                alertSentAt: alertSendingTime,
                alertId: alertId
            });
        });
    };

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <HeaderIcon
                navigation={navigation}
            />
        ),
        headerTintColor: Colors.tintColor
    });

    render(){

        if(this.state.canLaunchAlert) {
            return (
                <View style={[styles.container, styles.containerButton]}>
                    <SendAlertButton
                        countdownDelay={this.state.alertSendingDelay}
                        displayPopup={this.state.displayPopup}
                        cancelFunction={() => this._cancelAlert()}
                        prepareFunction={() => this._prepareAlert()}
                        skipFunction={() => this._skipAlertDelay()}
                        sendFunction={() => this._sendAlert()}>
                    </SendAlertButton>
                </View>
            )
        } else {
            return (
                <View style={[styles.container, styles.containerSentAlert]}>
                    <DisplaySentAlert
                        emitter={this.state.user}
                        alertSentAt={this.state.alertSentAt}
                        closeFunction={() => this._closeAlert(this.state.alertId)}>
                    </DisplaySentAlert>
                </View>
            )
        }
    }

}

// Screen sizes
const viewWidth = Math.round(Dimensions.get('window').width);
const viewHeight = Math.round(Dimensions.get('window').height);

// Styles
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        position: "relative",
        zIndex: -5
    },
    containerButton: {
        backgroundColor: "#B3CDFB",
    },
    containerSentAlert: {
        backgroundColor: "#FFFFFF",
    }
});