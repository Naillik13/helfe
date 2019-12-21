import React from "react"
import {StyleSheet, Text, FlatList, SafeAreaView} from "react-native";
import firebase from "firebase";
// import GetAlert from "./Alert/GetAlert";

export default class AlarmScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            emitter : [],
            users   : []
        }
    }

    _getAlerts = async (db = firebase.database()) => {

        // get alerts
        let snapshot = await db.ref('alerts').once('value')

        try {
            const object_alert = await snapshot.val() 
            
            if (object_alert != undefined && object_alert != null) {
                for (const property in object_alert) {
                    try {
                        if(object_alert[property].emitter != null && object_alert[property].emitter != 0) {
                            
                            return object_alert[property];
                        } else {
                            console.log("emitter is not ok", e)
                        }
                    } catch (e) {
                        console.error("alerts are not ok", e)
                    }
                }
            } else {
                console.log("not alert for the moment")
            }


        } catch (err) {
            console.error("connexion error", err)
        } 
            

    }

    _getUsers = async (db = firebase.database()) => {

        // get users
        let snapshot = await db.ref('users').once('value')
        
        try {
            const object_user = await snapshot.val()

            for (const prop in object_user) {
                try {
                    return object_user[prop]
                } catch (e) {
                    console.error("users are not ok", e)
                }
            }
            
         
        } catch(err) {
            console.error("connexion error", err)
        } 


    }


    componentDidMount = async () => {

       try {

        let alert  = await this._getAlerts()
        let user   = await this._getUsers()

        // ok
        console.log(alert, user)

        if (alert.emitter === user.uid) {
            // not ok > status command is pending 
            this.setState({
                emitter : emitter,
                users   : user
            }, () => console.log(this.state))
        } else {
            console.log("uid are not equal")
        }
        
       } catch (e) {
           console.error("cannot get a user with emit uid")
       }

    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text>AlarmScreen</Text>

                {/* get alerts sended -> components /Alert/GetAlert.js */}
                {/* <FlatList
                    data={this.state}
                    renderItem={({ item }) => 
                    <GetAlert 
                        status={item.emitter.status} 
                        firstName={item.users.firstName}
                    />}
                    keyExtractor={item => item.id}
                /> */}
            </SafeAreaView>
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