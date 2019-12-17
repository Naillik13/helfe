import React from 'react'
import {View, TextInput, Button, Image, TouchableOpacity, Text, StyleSheet} from 'react-native'
import firebase from "firebase";


export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
    }

    async signin() {

        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log("Logged in")
        } catch (error) {
            console.log(error.toString())
        }

    }

    render(){
        return(
            <View style={{}}>
                <Image style={styles.logo}
                 source={require('../../assets/logo.png')}/>
                <TextInput
                    style={styles.input}
                    placeholder='Login'
                    onChangeText={(email) => this.setState({email: email})}/>
                <TextInput
                    style={[styles.input, { marginTop: 30, marginBottom: 75}]}
                    placeholder='Password'
                    secureTextEntry={true}
                    password={true}
                    onChangeText={(password) => this.setState({password: password})}/>

                <TouchableOpacity style={[styles.button, {marginBottom: 30}]} onPress={() => this.signin()}>
                    <Text style={{color:"white", textAlign: "center", marginVertical: 6}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} /*onPress={() => navigate('#')}*/>
                    <Text style={{color:"white", textAlign: "center", marginVertical: 6}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        height: 300,
        width: 300,
        marginTop: 100,
        borderRadius: 25
    },
    input: {
        height: 40,
        marginLeft: 70,
        marginRight: 70,
        paddingLeft: 10,
        backgroundColor: '#b3cdfb',
        borderRadius: 25,
        fontSize: 18
    },
    button: {
        height: 30,
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 25
    }

});