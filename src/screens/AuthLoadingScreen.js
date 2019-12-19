import React from 'react'
import {ActivityIndicator, AsyncStorage, StyleSheet, View} from 'react-native'

export default class AuthLoadingScreen extends React.Component {
    constructor(props){
        super(props);
        this._checkSession();
    }

    _checkSession = () => {
        this._retrieveUser()
            .then(res => {
                if (res) {
                    this.props.navigation.navigate('App')
                } else {
                    this.props.navigation.navigate('Auth')
                }
            })
    };

    _retrieveUser = async () => {
        try {
            const value = await AsyncStorage.getItem('@User');
            if (value !== null) {
                return value
            }
        } catch (error) {
            alert("An error has occurred while retrieving current user");
        }
    };

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
});
