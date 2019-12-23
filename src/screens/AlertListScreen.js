import React from "react"
import {StyleSheet, Text, FlatList, SafeAreaView} from "react-native";
import firebase from "firebase";
import HeaderIcon from "../components/HeaderIcon";
import Colors from "../constants/Colors";
// import GetAlert from "./Alert/GetAlert";

export default class AlertListScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            emitters    : [],
            users       : [],
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

        try {

            var emitters
            let alert  = await this._getAlerts()
            let user   = await this._getUsers()

            this._getAlerts();

            if(alert != null && alert != undefined && user != null && user != undefined) {

                this.setState({
                    emitters    : this.state.emitters.concat([alert]),
                    users       : this.state.users.concat([user])
                })

                try {
                    var arr
                    var filter_arr

                    this.state.emitters.map(
                        (item_emit, k) => {
                            arr = Object.values(item_emit)

                            if(this.state.emitters.length < 2) {
                                arr     = [arr[k].emitter]
                            } else {
                                arr     = arr[k].emitter
                            }
                        }
                    )


                    this.state.users.forEach(el => {
                        filter_arr = Object.keys(el).filter(item =>
                            arr.toString() === item
                        )
                    })

                    console.log(filter_arr)

                } catch (e) {
                    console.error(e)
                }
            } else {
                console.log("There is no alert")
            }

        } catch (e) {
            console.error("cannot get a user with emit uid")
        }



    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text>AlertListScreen</Text>

                {/* get alerts sended -> components /Alert/GetAlert.js */}
                {/* <FlatList
                    data={this.state}
                    renderItem={({ item }) =>
                    <GetAlert
                        status={item.emitters.status}
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