import React from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import Colors from "../constants/Colors";
import {onSignOut} from "../Auth";
import InformationField from "../components/User/InformationField";
import HeaderIcon from "../components/HeaderIcon";
import FieldType from "../constants/FieldType";
import ConfirmLogin from "../components/User/ConfirmLogin";

export default class UserScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            userInformations: null,
            mustLogin: false,
            successfulAuthentication: false
        };
    }

    setMustLogin = (value) => {
        this.setState({mustLogin: value});
    };

    setSuccessfulAuthentication = () => {
        this.setMustLogin(false);
        this.setState({successfulAuthentication: true})
    };

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
                        email: userInformations.val().email,
                        phone: userInformations.val().phone
                    });
                });
            }
        });

    };

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <HeaderIcon
                navigation={navigation}
            />
        ),
        headerTintColor: Colors.tintColor
    });

    render(){

        if (!this.state.userInformations) {
            return  (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.tintColor} />
                </View>
            )
        }
        return(
            <ScrollView style={styles.container}>
                <ConfirmLogin
                    email={this.state.email}
                    mustLogin={this.state.mustLogin}
                    successfulAuthentication={this.state.successfulAuthentication}
                    setSuccessfulAuthentication={this.setSuccessfulAuthentication}
                    />

                <Image style={styles.user}
                       source={require('../../assets/user.png')}/>
                <View style={{flex:1, marginHorizontal: 15, justifyContent: "center"}}>
                    <View style={styles.headerFields}>
                        <InformationField
                            value={this.state.lastName}
                            type={FieldType.lastName}
                            styles={{fontWeight: 'bold'}}
                        />
                        <View style={{width: 15}}/>
                        <InformationField
                            value={this.state.firstName}
                            type={FieldType.firstName}
                            styles={{fontWeight: 'bold'}}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, {marginBottom: 30}]}
                    onPress={() => this._logout()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <InformationField
                    value={this.state.email}
                    type={FieldType.email}
                    successfulAuthentication={this.state.successfulAuthentication}
                    setMustLogin={this.setMustLogin}
                />
                <InformationField
                    value={this.state.password}
                    type={FieldType.password}
                    successfulAuthentication={this.state.successfulAuthentication}
                    setMustLogin={this.setMustLogin}
                />

                <InformationField
                    value={this.state.phone}
                    type={FieldType.phone}
                />

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
    headerFields: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }

});