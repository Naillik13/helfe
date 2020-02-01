import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native'
import Platform from "react-native";
import firebase from "firebase";
import _ from 'lodash'

export default class HeaderIcon extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            alert_arr: []
        }
    }

    componentDidMount = async () => {
        let arr         = []
        let db          = await firebase.database()
        let snapshot    = await db.ref('alerts').once('value');
        let values      = await snapshot.val()
        let array_val   = _.toArray(values)

        array_val.map(val => {
            if(val.status !== "closed") {
                arr.push(val)
            }
        })

        this.setState({
            alert_arr: this.state.alert_arr.concat(arr)
        });
    }

    render() {
        let { alert_arr } = this.state
        return (
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{color: "#fff", marginRight: 3}}>{alert_arr.length > 0 ? alert_arr.length : "0"}</Text>
                <TouchableOpacity style={{marginRight: 15}} onPress={() => this.props.navigation.navigate('AlertList')}>
                    <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? 'ios-alert'
                                : 'md-alert'
                        }
                        size={25}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}