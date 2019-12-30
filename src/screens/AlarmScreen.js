import React from "react"
import {StyleSheet, Dimensions, View} from "react-native";
import firebase from "firebase";
import SendAlertButton from "../components/Alert/SendAlertButton";
import SendingConfirmationPopup from "../components/Alert/SendingConfirmationPopup";
import DisplaySentAlert from "../components/Alert/DisplaySentAlert";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

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

    _skipAlertDelay = () => {
        this.setState({
            alertSendingDelay: 0,
            displayPopup: false
        }, () => {
            this._sendAlert()
        });
    }

    _sendAlert = () => {

        if(this.state.canLaunchAlert === true && this.state.alertSendingDelay == 0) {

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
            }).then(_ => {
                alert('Alerte envoyée !');
                this.setState({
                    buttonIsDisabled: true,
                    canLaunchAlert: false,
                    alertSentAt: sendingTime
                });
            }).catch(error => {
                alert(error.message);
            });

        } else {
            alert('Vous ne pouvez pas envoyez plusieurs alertes à la fois.');
        }
    };

    _checkAlerts = (user) => {
       
        // Check if alert is already launched by current user
        // Set to true by default
        let allowAlertSending = true;
        let disableButton = false;
        let userId = user.uid;
        let alertSendingTime = 0;
        
        // Firebase references
        const database = firebase.database();
        const alertsReference = database.ref("alerts");

        alertsReference.on('value', (alerts) => {

            // When values are found in alerts table,
            // loop through each alert
            alerts.forEach((alertObject) => {
                let emitterId = alertObject.val().emitter;

                // If the current user is found as emitter in an alert,
                // disable the button and the sending of alerts
                let alertSendStatus = ["started", "open", "confirmed"];
                let alertAlreadySent = (emitterId === userId && alertSendStatus.includes(alertObject.val().status));
                if(emitterId === userId) alertSendingTime = alertObject.val().sendAt;

                allowAlertSending = !alertAlreadySent;
                disableButton = alertAlreadySent;
            });

            this.setState({
                canLaunchAlert: allowAlertSending,
                buttonIsDisabled: disableButton,
                alertSentAt: alertSendingTime
            });
        });
    };

    render(){
        
        if(this.state.canLaunchAlert) {
            return (                
                <View style={[styles.container, styles.containerButton]}>
                    <SendAlertButton
                        countdownDelay={this.state.alertSendingDelay}
                        displayPopup={this.state.displayPopup}
                        buttonIsDisabled={this.state.buttonIsDisabled}
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
                    <DisplaySentAlert alertSentAt={this.state.alertSentAt}>
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