import React from 'react'
import {View, TextInput, Image, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native'
import firebase from "firebase";
import {onLogin} from '../Auth'

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    _login = (email, password) => {

        try {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    console.log(res.user.email);
                    onLogin(res.user.email).then(() => {
                        this.props.navigation.navigate('Main')
                    })
                })
                .catch(error => {
                    alert(error.message);
                });

        } catch (error) {
            console.log(error.toString());
        }

    };

    static navigationOptions = () => ({
        header: null,
    });

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.logo}
                 source={require('../../assets/logo.png')}/>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={placeHolderColor}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={(email) => this.setState({email: email})}/>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={placeHolderColor}
                    placeholder='Password'
                    secureTextEntry={true}
                    password={true}
                    onChangeText={(password) => this.setState({password: password})}/>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.5}
                    onPress={() => this._login(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.5}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// Screen sizes
const viewWidth = Math.round(Dimensions.get('window').width);
const viewHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1
    },
    logo: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        marginTop: 80,
        marginBottom: 50,
        borderRadius: 25
    },
    input: {
        width: (viewWidth / 100 * 75),
        alignSelf: 'center',
        marginBottom: 25,
        backgroundColor: '#b3cdfb',
        borderRadius: 25,
        fontSize: 16,
        padding: 5,
        paddingLeft: 20,
        fontFamily: "montserrat-regular"
    },
    button: {
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 25,
        borderRadius: 25
    },
    buttonText: {
        color:"white",
        textAlign: "center",
        fontSize: 16,
        marginVertical: 10,
        padding: 3,
        fontFamily: "montserrat-semibold"
    }
});

const placeHolderColor = "#555555"