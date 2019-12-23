import React from "react"
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CountdownCircle from "react-native-countdown-circle";
import Colors from "../../constants/Colors.js";

export default function SendingConfirmationPopup(props) {
    
    return (
        <View style={styles.popupContainer}>
            <View style={styles.popup}>
                <Text>L'alerte va se lancer dans</Text>
                
                <CountdownCircle
                    style={this.countdownCircle}
                    seconds={props.countdownDelay}
                    radius={40}
                    borderWidth={8}
                    color={Colors.tintColor}
                    bgColor="#fff"
                    textStyle={{ fontSize: 20 }}
                    onTimeElapsed={() => alert('OK !')}
                ></CountdownCircle>

                <View style={styles.popupButtons}>

                    <TouchableOpacity
                        onPress={props.cancelFunction}
                        style={[styles.button, styles.buttonCancel]}>
                        <Text style={[styles.buttonText]}>Annuler</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={props.skipFunction}
                        style={[styles.button, styles.buttonSkip]}>
                        <Text style={[styles.buttonText]}>PASSER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const viewWidth = Math.round(Dimensions.get('window').width);
const viewHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    popupContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 999
    },
    popup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: (viewWidth / 100 * 75),
        height: (viewHeight / 100 * 30),
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 15
    },
    countdownCircle: {
        margin: 0,
        padding: 0
    },
    popupButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    },
    button: {
        display: "flex",
        justifyContent: "center",
        height: 50,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "#ffffff",
        margin: 0,
        padding: 0
    },
    buttonCancel: {
        backgroundColor: Colors.tintColor,
        textTransform: "none"
    },
    buttonSkip: {
        backgroundColor: Colors.tabBar,
        textTransform: "uppercase"
    }
});