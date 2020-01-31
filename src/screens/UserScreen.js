import React from "react"
import {
    TextInput,
    ScrollView,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Platform
} from "react-native";
import firebase from "firebase";
import Colors from "../constants/Colors";
import {onSignOut} from "../Auth";
import Icon from "../components/Icon";

export default class UserScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            userInformations: null,
            lastNameEditable: false,
            firstNameEditable:  false,
            emailEditable: false
        };
    }

    _logout = () => {
        try {
            firebase.auth()
                .signOut()
                .then(_ => {
                    onSignOut()
                        .then(_ => {
                            this.props.navigation.navigate('Default')
                        })
                        .catch(error => {
                            console.log(error.message)
                        });
                }).catch(error => {
                    alert(error.message);
                });
        } catch (error) {
            console.log(error.toString());
        }
    };

    componentDidMount = () => {
        // Retrieve the current user
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const rootReference = firebase.database().ref();
                const usersReference = rootReference.child("users");
                usersReference.child(user.uid).once("value").then(userInformations => {
                    this.setState({
                        user: user,
                        userInformations: userInformations.val(),
                        lastName: userInformations.val().lastName,
                        firstName: userInformations.val().firstName,
                        email: userInformations.val().email
                    });
                });
            }
        });

    };

    render(){

        if (!this.state.userInformations) {
            return  (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.tintColor} />
                </View>
            )
        }
        return(
            <ScrollView style={[styles.container]}>

                <Image style={styles.user}
                       source={require('../../assets/user.png')}/>

                <View style={styles.inputsRow}>
                    <TextInput
                        style={[styles.input, {fontWeight: "bold"}]}
                        placeholderTextColor = "#999999"
                        placeholder='Nom'
                        value={this.state.lastName}
                        onChangeText={(lastName) => this.setState({lastName: lastName})}
                        editable={this.state.lastNameEditable}
                    />
                    <Icon
                        name={
                            Platform.OS === 'ios'
                                ? `ios-create`
                                : 'md-create'
                        }
                    />
                </View>
                <View style={styles.inputsRow}>
                    <TextInput
                        style={[styles.input, {fontWeight: "bold"}]}
                        placeholderTextColor = "#999999"
                        placeholder='Prénom'
                        value={this.state.firstName}
                        onChangeText={(firstName) => this.setState({firstName: firstName})}
                        editable={this.state.firstNameEditable}
                    />
                    <Icon
                        name={
                            Platform.OS === 'ios'
                                ? `ios-create`
                                : 'md-create'
                        }
                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, {marginBottom: 30}]}
                    onPress={() => this._logout()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.inputsEdit}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor = "#999999"
                        placeholder='Email'
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email: email})}
                        editable={this.state.emailEditable}
                    />
                    <Icon
                        name={
                            Platform.OS === 'ios'
                                ? `ios-create`
                                : 'md-create'
                        }
                    />
                </View>

                <View style={styles.inputsEdit}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor = "#999999"
                        placeholder='Password'
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password: password})}
                        editable={this.state.passwordEditable}
                    />
                    <Icon
                        name={
                            Platform.OS === 'ios'
                                ? `ios-create`
                                : 'md-create'
                        }
                    />
                </View>

                <View style={styles.inputsEdit}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor = "#999999"
                        placeholder='Email'
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({phone: phone})}
                        editable={this.state.phoneEditable}
                    />
                    <Icon
                        name={
                            Platform.OS === 'ios'
                                ? `ios-create`
                                : 'md-create'
                        }
                    />
                </View>

                <View style={styles.inputsEdit}>
                    <Text>CI</Text>
                </View>

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },

    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    user: {
        height: 150,
        width: 150,
        alignSelf: "center",
        marginTop: 50,
    },

    button: {
        height: 42,
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 25,
        marginTop: 30,
    },

    buttonText: {
        color:"white",
        textAlign: "center",
        fontSize: 18,
        marginVertical: 10,
    },

    input: {
        fontWeight: "200",
        fontSize: 18,
        paddingRight: 60,
        marginTop: 8,
    },

    inputsRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        alignItems: "center"
    },

    inputsEdit: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        alignItems: "center"
    },

});