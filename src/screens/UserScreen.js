import React from "react"
import {StyleSheet, Button, Text, View} from "react-native";
import firebase from "firebase";
import {onSignOut} from "../Auth";

export default class UserScreen extends React.Component {
    constructor(props){
        super(props);
    }

    _logout = () => {
        try {
            firebase.auth()
                .signOut()
                .then(_ => {
                    onSignOut()
                        .then(_ => {
                            this.props.navigation.navigate('Default')
                        })
                        .catch(error => {
                            console.log(error.message)
                        });
                }).catch(error => {
                    alert(error.message);
                });


        } catch (error) {
            console.log(error.toString());
        }

    };

    render(){
        return(
            <View style={styles.container}>
                <Text>ProfilScreen</Text>
                <Button  title="Logout" onPress={() => this._logout()}/>

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