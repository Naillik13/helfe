import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native'
import Platform from "react-native";

export default function HeaderIcon(props) {

    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{color: "#fff", marginRight: 3}}>3</Text>
            <TouchableOpacity style={{marginRight: 15}} onPress={() => props.navigation.navigate('AlertList')}>
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