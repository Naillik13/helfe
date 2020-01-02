import React, { useDebugValue } from "react"
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SendingConfirmationPopup from "./SendingConfirmationPopup";

export default function SendAlertButton(props) {
    return (
        <View style={styles.container}>

            {props.displayPopup &&
                <SendingConfirmationPopup
                    cancelFunction={props.cancelFunction}
                    skipFunction={props.skipFunction}
                    sendFunction={props.sendFunction}
                    countdownDelay={props.countdownDelay}>
                </SendingConfirmationPopup> 
            }

            <View style={[styles.circle, styles.firstCircle]}>
                <View style={[styles.circle, styles.secondCircle]}>
                    <View style={[styles.circle, styles.thirdCircle]}>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                title="Envoi d'alerte"
                onPress={props.prepareFunction}
                style={[styles.alert, (props.buttonIsDisabled ? styles.alertDisabled : styles.alertEnabled)]}>
                <Image
                    source={require('../../../assets/icon-alert.png')}
                    style={[styles.alertIcon]}></Image>  
            </TouchableOpacity>
        </View>
    )
}

const viewWidth = Math.round(Dimensions.get('window').width);
const viewHeight = Math.round(Dimensions.get('window').height);

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
    },
    alert: {
        width: (viewWidth / 100 * 45),
        height: (viewHeight / 100 * 22.5),
        borderRadius: 9999,
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    alertDisabled: {
        backgroundColor: "#cccccc",
        opacity: 0.8
    },
    alertEnabled: {
        backgroundColor: "#ffffff",
        opacity: 1
    },
    alertIcon: {
        zIndex: 888,
        alignSelf: "center"
    }
})