import React from 'react'
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native'
import firebase from "firebase";


export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
    }

    async signin(email, pass) {

        try {
            await firebase.auth().signInWithEmailAndPassword(email, pass);

            console.log("Logged in");

            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            console.log(error.toString())
        }

    }

    render(){
        return(
            <View style={{}}>
                <Image style={{alignSelf: 'center', height: 300, width: 300, marginTop: 100, borderRadius: 25}}
                 source={require('../../assets/logo.png')}/>
                <TextInput style={{height: 40, marginLeft: 70, marginRight: 70, paddingLeft: 10, backgroundColor: '#b3cdfb', borderRadius: 25, fontSize: 20}} placeholder='Login'/>
                <TextInput style={{height: 40, marginTop: 30, marginLeft: 70, marginRight: 70, paddingLeft: 10, marginBottom: 75,backgroundColor: '#b3cbfd', borderRadius: 25, fontSize: 20}} placeholder='Password'/>

                <TouchableOpacity style={{height: 30, backgroundColor: '#212580', marginLeft: 100, marginRight: 100, marginBottom: 30 , borderRadius: 25}} onPress={() => this.signin("killian.galea0@orange.fr", "Mypass13")}>
                    <Text style={{color:"white", textAlign: "center", marginVertical: 6}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height: 30 ,backgroundColor: '#212580', marginLeft: 100, marginRight: 100, borderRadius: 25}} /*onPress={() => navigate('#')}*/>
                    <Text style={{color:"white", textAlign: "center", marginVertical: 6}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}