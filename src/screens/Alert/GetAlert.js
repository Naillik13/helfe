import React from "react"
import {Text, View} from "react-native";

export default class GetAlert extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>
                {/* status */}
                <Text>{this.props.status}</Text>
                {/* first name */}
                <Text>{this.props.firstName}</Text>
            </View>
        );
    }

}