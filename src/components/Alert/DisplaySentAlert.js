import React from "react"
import { View, StyleSheet, Image, Text } from "react-native";

export default function DisplaySentAlert(props) {

    _readAlertSentDate = (date) => {

        if(date > 0) {
            let formatDate = new Date(date * 1000);
            const hours = formatDate.getHours();
            const minutes = "0" + formatDate.getMinutes();
            return hours + ':' + minutes.substr(-2);
        }
    }
    
    return (
        <View>
            <Text>Alerte envoyée à {this._readAlertSentDate(props.alertSentAt)}</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "#ffffff"
    }
});