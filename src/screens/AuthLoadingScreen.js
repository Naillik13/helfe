import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import firebase from "firebase";


export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.checkSession();
    }

    checkSession = () => {
        // Not working
        const user = firebase.auth().currentUser;

        if (user) {
            this.props.navigation.navigate('App')
        } else {
            this.props.navigation.navigate('Auth')
        }
    }

    render(){
        return(
            <View style={[styles.container, styles.vertical]} >
                <ActivityIndicator size="large" color="#b3cdfb" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    vertical: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    }
})
