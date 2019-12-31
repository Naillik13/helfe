import React from "react"
import { View, StyleSheet, ActivityIndicator, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import Colors from "../../constants/Colors";

export default function DisplaySentAlert(props) {

    _displayAlertSentDate = (date) => {

        if(date > 0) {
            // now is the timestamp where the user is in the app
            // formatDate is the date of the alert sent
            let nowTimeStamp = new Date().getTime();
            let now = new Date(nowTimeStamp);
            let formatDate = new Date(date * 1000);

            // Retrieve day, month and year to determine
            // alert sending time. Eg: today, yesterday...
            let sentDay = formatDate.getDay();
            let sentMonth = formatDate.getMonth();
            let sentYear = formatDate.getFullYear();

            // Current time informations
            let currentDay = now.getDay();
            let currentMonth = now.getMonth();
            let currentYear = now.getFullYear();

            // Hour of sending
            let sentHours = formatDate.getHours();
            let sentMinutes = "0" + formatDate.getMinutes();
            let sentTime = sentHours + "h" + sentMinutes.substr(-2);

            // The word to indicate the time 
            // where the alert was sent
            let timeSentIndication = "";
            let timeSentHour = " à " + sentTime;

            if(currentDay == sentDay && currentMonth == sentMonth && currentYear == sentYear) {
                timeSentIndication = " aujourd'hui"; // Today
            } else if (currentDay != sentDay && currentMonth == sentMonth && currentYear == sentYear) {
                timeSentIndication = " il y a " + (currentDay - sentDay) + " jours"; // x days before today
            } else if (currentDay != sentDay && currentMonth != sentMonth && currentYear == sentYear) {
                timeSentIndication = " il y a " + (currentMonth - sentMonth) + " mois"; // x months before today
            } else if (currentDay != sentDay && currentMonth != sentMonth && currentYear != sentYear) {
                timeSentIndication = " il y a " + (currentYear - sentYear) + " ans"; // x years before today
            }

            return timeSentIndication + timeSentHour;
        }
    }

    if(props.alertId !== 0 && props.alertSentAt !== 0) {
        return(
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('../../../assets/logo.png')}/>
                <Text style={styles.paragraph}>
                    L'alerte a été lancée{this._displayAlertSentDate(props.alertSentAt)}.{"\n"}
                    Un membre de la communauté va venir vous aider.        
                </Text>
                <Text style={styles.paragraph}>
                    Veuillez nous signaler lorsque vous êtes en sécurité sur le bouton juste en dessous.
                </Text>
                <TouchableOpacity
                    onPress={props.closeFunction}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Je suis en sécurité
                    </Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return(
            <View style={[styles.container]} >
                <ActivityIndicator size="large" color="#b3cdfb"/>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "#ffffff"
    },
    logo: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        marginVertical: 20,
    },
    paragraph: {
        textAlign: "center",
        paddingHorizontal: 5,
        marginVertical: 15,
    },
    button: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: Colors.tintColor,
        borderRadius: 20
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold"
    }
});