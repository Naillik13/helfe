import React from "react"
import {StyleSheet, Text, FlatList, SafeAreaView} from "react-native";
import firebase from "firebase";
import HeaderIcon from "../components/HeaderIcon";
import Colors from "../constants/Colors";
import GetAlert from "./Alert/GetAlert";

export default class AlertListScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            alerts : []
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <HeaderIcon
                navigation={navigation}
            />
        ),
        headerTintColor: "#fff"
    });



    _getAlerts = async (db = firebase.database()) => {

        // get alerts
        let snapshot = await db.ref('alerts').once('value')

        try {
            const object_alert = await snapshot.val()

            if (object_alert != undefined && object_alert != null) {
                return object_alert
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
            return object_user

        } catch(err) {
            console.error("connexion error", err)
        }


    }

    componentDidMount = async () => {

        // Get all alerts and users (Object)
        var alerts              = await this._getAlerts()
        var users               = await this._getUsers()

        // Set Array
        var emit_array          = []
        var users_array         = []
        var users_with_alerts   = []
        var alerts_array        = []
        var new_object          = {}

        // Get alerts with array
        for (let values of Object.values(alerts)) {
            emit_array.push(values)
        }

        // Get users with array
        for (let val of Object.values(users)) {
            users_array.push(val)
        }

        // Get users with alerts
        emit_array.map(emit => {
            let new_users = users_array.filter(user => user.uid === emit.emitter)
            if (new_users.length > 0) {
                users_with_alerts.push(new_users)
            }
        })

        // Get alerts with users
        users_array.map(user => {
            let new_alerts = emit_array.filter(emit => emit.emitter === user.uid)
            if( new_alerts.length > 0) {
                alerts_array.push(new_alerts)
            }
        })

        // Get Status
        alerts_array.map(alert => {
            // Set state if not empty
            Object.assign(new_object, {status: alert[0].status});
        })

        // Get First Name
        users_with_alerts.map(user => {
            // Set state if not empty
            Object.assign(new_object, {
                id:        user[0].uid,
                firstName: user[0].firstName
            });
        })

        // GET ALERT AND USER IN ONLY ONE STATE
        this.setState({
            alerts: this.state.alerts.concat(new_object)
        })

    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text>AlarmScreen</Text>
                <FlatList
                    data={this.state.alerts}
                    renderItem={({ item }) =>
                    <GetAlert
                        status={item.status}
                        firstName={item.firstName}
                    />}
                    keyExtractor={item => item.id}
                />
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
