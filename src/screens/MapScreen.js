import React from "react"
import {StyleSheet, Text, View} from "react-native";
import HeaderIcon from "../components/HeaderIcon";
import Colors from "../constants/Colors";

export default class MapScreen extends React.Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <HeaderIcon
                navigation={navigation}
            />
        ),
        headerTintColor: Colors.tintColor
    });

    render(){
        return(
            <View style={styles.container}>
                <Text>MapScreen</Text>
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