import React from "react"
import {StyleSheet, Button, Text, View} from "react-native";
import firebase from "firebase";

export default class UserScreen extends React.Component {
    constructor(props){
        super(props);
    }

    async signup(email, pass) {

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, pass);

            console.log("Account created");

            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            console.log(error.toString())
        }

    }


    render(){
        return(
            <View style={styles.container}>
                <Text>ProfilScreen</Text>
                <Button  title="New user" onPress={() => this.signup("killian.galea0@orange.fr","Mypass13")}/>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    }
});