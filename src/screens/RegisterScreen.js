import React from 'react'
import {View, TextInput, Image, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native'
import firebase from "firebase";
import {onLogin} from '../Auth'

export default class RegisterScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    }

    static navigationOptions = () => ({
        headerTitle: 
        <Text style={styles.headerTitle}>
            Login
        </Text>,
        headerTransparent: true
    });

    _saveUserFirebase = async (user) => {

        const rootReference = firebase.database().ref();
        const usersReference = rootReference.child("users");

        firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser) {
                let newUserInstance = usersReference.child(user.uid);
                newUserInstance.set(user);
            }
        });
    };

    _signIn = (lastName, firstName, email, password) => {

        try {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(res => {
                    
                    let newUser = {
                        uid: res.user.uid,
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    };

                    this._saveUserFirebase(newUser)
                        .then(_ => {
                            onLogin(res.user.email)
                                .then(_ => {
                                    this.props.navigation.navigate('Main')
                                })
                        });

                })
                .catch(error => {
                    alert(error.message);
                });

        } catch (error) {
            console.log(error.toString());
        }

    };

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.logo}
                 source={require('../../assets/logo.png')}/>
                
                <View style={styles.inputsRow}>
                    <TextInput
                        style={[styles.input, styles.inputFlex]}
                        placeholderTextColor={placeHolderColor}
                        placeholder='Nom'
                        onChangeText={(lastName) => this.setState({lastName: lastName})}/>
                    <TextInput
                        style={[styles.input, styles.inputFlex]}
                        placeholderTextColor={placeHolderColor} 
                        placeholder='Prénom'
                        onChangeText={(firstName) => this.setState({firstName: firstName})}/>
                </View>

                <TextInput
                    style={[styles.input, styles.inputFull]}
                    placeholderTextColor={placeHolderColor} 
                    placeholder='Email'
                    onChangeText={(email) => this.setState({email: email})}/>
                <TextInput
                    style={[styles.input, styles.inputFull]}
                    placeholderTextColor={placeHolderColor} 
                    placeholder='Password'
                    secureTextEntry={true}
                    password={true}
                    onChangeText={(password) => this.setState({password: password})}/>

                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => this._signIn(this.state.lastName, this.state.firstName, this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// Screen sizes
const viewWidth = Math.round(Dimensions.get('window').width);
const viewHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: "montserrat-semibold",
        fontSize: 18
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        margin: 0,
    },
    logo: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        marginBottom: 30,
        marginTop: 80,
    },
    inputsRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 15
    },
    inputFlex: {
        flexGrow: 1,
        maxWidth: 150,
        marginHorizontal: 15
    },
    inputFull: {
        marginHorizontal: 30,
    },
    input: {
        backgroundColor: '#b3cdfb',
        borderRadius: 25,
        fontSize: 16,
        marginBottom: 25,
        padding: 5,
        paddingLeft: 20,
        fontFamily: "montserrat-regular"
    },
    button: {
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 15,
        marginBottom: 15,
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