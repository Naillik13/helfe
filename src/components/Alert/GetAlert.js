import React from "react"
import Platform, {StyleSheet, Text, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";


export default class GetAlert extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.componentContainer}>
                <View style={styles.container}>
                    <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? 'ios-alert'
                                : 'md-alert'
                        }
                        size={40}
                        color={Colors.defaultColor}
                    />
                    <View style={{marginLeft: 20}}>
                        <Text>{this.props.firstName} a besoin d'aide !</Text>
                        <Text  style={{color: 'grey',}}>Il y a {this.props.interval} minutes</Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    componentContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },


});