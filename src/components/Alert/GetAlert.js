import React from "react"
import {Text, View} from "react-native";

export default class GetAlert extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>
                {/* emit */}
                <Text>{this.props.status} est en danger !!</Text>
                {/* status */}
                <Text>{this.props.firstName} est en danger !!</Text>
            </View>
        );
    }

}