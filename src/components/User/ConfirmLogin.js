import React from "react"
import {Dimensions, StyleSheet, TouchableOpacity, TextInput, View, Modal, Text} from "react-native";
import firebase from "firebase";

export default class ConfirmLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: props.email,
        };
    }

    _login = (password) => {
        let setSuccessfulAuthentication = this.props.setSuccessfulAuthentication;

        try {
            firebase.auth()
                .signInWithEmailAndPassword(this.state.email, password)
                .then(_ => {
                    setSuccessfulAuthentication()
                })
                .catch(error => {
                    alert(error.message);
                });

        } catch (error) {
            console.log(error.toString());
        }

    };

    render(){
        console.log(this.props.mustLogin);
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.mustLogin && !this.props.successfulAuthentication}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={styles.overlay}/>
                <View style={styles.container}>

                    <Text style={{textAlign: "center"}}>You must confirm your identity before updating this field.</Text>
                    <TextInput
                        style={[styles.input, this.props.styles]}
                        placeholderTextColor = "#999999"
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({password: value})}
                        returnKeyLabel='send'
                    />

                    <TouchableOpacity
                        style={[styles.button, {marginBottom: 30}]}
                        onPress={() => this._login(this.state.password)}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        );
    }

}

const viewWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    input: {
        width: (viewWidth / 100 * 75),
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 10,
        backgroundColor: '#b3cdfb',
        borderRadius: 25,
        fontSize: 16,
        padding: 5,
        paddingLeft: 20,
    },
    button: {
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 25
    },
    buttonText: {
        color:"white",
        textAlign: "center",
        fontSize: 16,
        marginVertical: 10,
        padding: 3,
    },
    overlay: {
        flex:1,
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.5,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 100,
        paddingHorizontal: 30,
        paddingTop: 20,
        justifyContent: "center"
    },

});