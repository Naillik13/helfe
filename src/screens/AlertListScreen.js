import React from "react"
import {FlatList, View, StyleSheet, Text} from "react-native";
import firebase from "firebase";
import HeaderIcon from "../components/HeaderIcon";
import GetAlert from "../components/Alert/GetAlert";

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
        let snapshot = await db.ref('alerts').once('value');

        try {
            const object_alert = await snapshot.val();

            if (object_alert !== undefined && object_alert != null) {
                return object_alert
            } else {
                console.log("not alert for the moment")
            }


        } catch (err) {
            console.error("connexion error", err)
        }


    };

    _getUsers = async (db = firebase.database()) => {

        // get users
        let snapshot = await db.ref('users').once('value');

        try {
            return await snapshot.val();

        } catch(err) {
            console.error("connexion error", err)
        }


    };

    componentDidMount = async () => {

        // Get all alerts and users (Object)
        let alerts              = await this._getAlerts();
        let users               = await this._getUsers();

        // Set Array
        let emit_array          = [];
        let users_array         = [];
        let users_with_alerts   = [];
        let alerts_array        = [];
        let new_object          = {};

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
            let new_users = users_array.filter(user => user.uid === emit.emitter);
            if (new_users.length > 0) {
                users_with_alerts.push(new_users)
            }
        });

        // Get alerts with users
        users_array.map(user => {
            let new_alerts = emit_array.filter(emit => emit.emitter === user.uid);
            if( new_alerts.length > 0) {
                alerts_array.push(new_alerts)
            }
        });

        // Get Status
        alerts_array.map(alert => {
            // Set state if not empty
            let interval  = new Date().getTime() - new Date(alert[0].sendAt * 1000).getTime();
            interval = Math.round(((interval % 86400000) % 3600000) / 60000);

            let is_started = alert.filter(item => item.status !== "closed")


            Object.assign(new_object, {status: is_started[0].status, interval: interval});


        });

        // Get First Name
        users_with_alerts.map(user => {
            // Set state if not empty
            Object.assign(new_object, {
                id:        user[0].uid,
                firstName: user[0].firstName
            });
        });


        // GET ALERT AND USER IN ONLY ONE STATE
        this.setState({
            alerts: this.state.alerts.concat(new_object)
        });

    };

    render(){
        // "started", "open", "confirmed"
        let alerts = this.state.alerts.filter(alert => {
            return alert.status !== "closed"
        })

        let flatList = <FlatList
                            data={alerts}
                            renderItem={({ item }) =>
                                <GetAlert
                                    status={item.status}
                                    firstName={item.firstName}
                                    interval={item.interval}
                                />
                            }
                            keyExtractor={item => item.id}
                        />
        return(
            <View>
                {alerts.length > 0 ? flatList : <Text>There are no alerts</Text>}
            </View>
        );
    }
}
