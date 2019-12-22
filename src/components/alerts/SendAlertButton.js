import React from "react"
import {StyleSheet, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SendAlertButton(props) {
    return (
        <TouchableOpacity
            title="Envoi d'alerte"
            disabled={props.buttonIsDisabled}
            onPress={props.alertFunction}
            style={[styles.alert, (props.buttonIsDisabled ? styles.alertDisabled : styles.alertEnabled)]}>
            <Image
                source={require('../../../assets/icon-alert.png')}
                style={[styles.alertIcon]}></Image>  
        </TouchableOpacity>
    )
}

const viewWidth = Math.round(Dimensions.get('window').width);
const viewHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
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
        zIndex: 999,
        alignSelf: "center"
    }
})