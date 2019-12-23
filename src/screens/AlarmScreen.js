import React from "react"
import {StyleSheet, Dimensions, View, Platform} from "react-native";
import firebase from "firebase";
import SendAlertButton from "../components/alerts/SendAlertButton";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default class AlarmScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttonIsDisabled: true,
            canLaunchAlert: true,
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
                })
                this._checkAlerts(this.state.user);
            }
        });
    }

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

    _sendAlert = () => {

        if(this.state.canLaunchAlert === true) {

            // Firebase references
            const rootReference = firebase.database().ref();
            const alertsReference = rootReference.child("alerts");

            // UNIX timestamp where alert was send (without milliseconds)
            let sendingTime = Math.floor(new Date().getTime() / 1000);
            console.log(this.state.location)
            alertsReference.push({
                "emitter": this.state.user.uid,
                "helpers": null,
                "status": "started",
                "location": {
                    "latitude": this.state.location.coords.latitude,
                    "longitude": this.state.location.coords.longitude
                },
                "sendAt": sendingTime
            }).then(response => {
                alert('Alerte envoyée !');
                this.setState({
                    buttonIsDisabled: true,
                    canLaunchAlert: false
                });
            }).catch(error => {
                alert(error.message);
            });

        } else {
            alert('Vous ne pouvez pas envoyez plusieurs alertes à la fois.');
        }
    }

    _checkAlerts = (user) => {
       
        // Check if alert is already launched by current user
        // Set to true by default
        let allowAlertSending = true;
        let disableButton = false;
        let userId = user.uid;
        
        // Firebase references
        const database = firebase.database();
        const alertsReference = database.ref("alerts");

        alertsReference.on('value', (alerts) => {

            // When values are found in alerts table,
            // loop through each alert
            alerts.forEach((alertObject) => {
                var emitterId = alertObject.val().emitter;

                // If the current user is found as emitter in an alert,
                // disable the button and the sending of alerts
                let alertStatus = ["started", "open", "confirmed"]
                allowAlertSending = (emitterId === userId && alertStatus.includes(alertObject.val().status)) ? false : allowAlertSending;
                disableButton = (emitterId === userId && alertStatus.includes(alertObject.val().status)) ? true : disableButton;
            });

            this.setState({
                canLaunchAlert: allowAlertSending,
                buttonIsDisabled: disableButton
            });
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.circle, styles.firstCircle]}>
                    <View style={[styles.circle, styles.secondCircle]}>
                        <View style={[styles.circle, styles.thirdCircle]}>
                        </View>
                    </View>
                </View>
                <SendAlertButton
                    buttonIsDisabled={this.state.buttonIsDisabled}
                    alertFunction={() => this._sendAlert()}>
                </SendAlertButton>
            </View>
        );
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
        backgroundColor: "#B3CDFB",
        position: "relative",
        zIndex: -5
    },
    circle: {
        borderRadius: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4350cf",
        position: "absolute",
    },
    firstCircle: {
        width: (viewWidth / 100 * 120),
        height: (viewHeight / 100 * 65),
        opacity: 0.5,
        zIndex: -4
    },
    secondCircle: {
        width: (viewWidth / 100 * 95),
        height: (viewHeight / 100 * 50),
        opacity: 0.75,
        zIndex: -3
    },
    thirdCircle: {
        width: (viewWidth / 100 * 70),
        height: (viewHeight / 100 * 35),
        opacity: 1,
        zIndex: -2
    }
});