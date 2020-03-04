import React from 'react';
import {isLoggedIn} from "./Auth";
import {createRootNavigator} from "./Router";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {createAppContainer} from "react-navigation";
import * as Font from 'expo-font';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            checkedLogin: false,
            fontLoaded: false
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'montserrat-thin': require('../assets/fonts/Montserrat-Thin.ttf'),
            'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
            'montserrat-semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        });
        this.setState({
            fontLoaded: true
        });
    }

    componentDidMount() {
        isLoggedIn()
            .then(res => this.setState({ loggedIn: res, checkedLogin: true }))
            .catch(_ => alert("An error occurred"));
    }

    render() {
        const { checkedLogin, loggedIn, fontLoaded } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedLogin || !fontLoaded) {
            return (
                <View style={[styles.container, styles.vertical]} >
                    <ActivityIndicator size="large" color="#b3cdfb" />
                </View>
            )
        }

        const Layout = createAppContainer(createRootNavigator(loggedIn));
        return <Layout />;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    vertical: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    }
});