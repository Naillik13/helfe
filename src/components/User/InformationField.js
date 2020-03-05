import React from "react"
import {Platform, StyleSheet, TouchableOpacity, TextInput, View, Text} from "react-native";
import firebase from "firebase";
import FieldType from "../../constants/FieldType";
import Colors from "../../constants/Colors";
import Icon from "../Icon";

export default class InformationField extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: props.value,
            type: props.type,
            isEditable: false,
            success: false
        };
    }

    _focusField = () => {
        if ((this.state.type === FieldType.password || this.state.type === FieldType.email) && !this.props.successfulAuthentication){
            let setMustLogin = this.props.setMustLogin;
            setMustLogin(true);
        } else {
            this.setState({isEditable: true}, () => {
                this.refs.field.focus();
            });
        }
    };

    _updateDatabaseField = () => {
        this._updateUserInformationFirebase().then(() => {
            this.setState({
                isEditable: !this.state.isEditable,
                success: true
            })
        }).catch(e => {
            console.log(e)
        })

    };

    _updateUserInformationFirebase = async () => {
        const rootReference = firebase.database().ref();

        if (this.state.type === FieldType.password) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    user.updatePassword(this.state.value)
                }
            });
        } else if (this.state.type === FieldType.email) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    user.updateEmail(this.state.value).then(() => {
                        const usersReference = rootReference.child("users");
                        let userChanges = {};
                        userChanges[this.state.type.key] = this.state.value;
                        let userInstance = usersReference.child(user.uid);
                        userInstance.update(userChanges)
                    }).catch((e) => {
                        console.log(e);
                    })

                }
            });
        } else {
            const usersReference = rootReference.child("users");

            let userChanges = {};
            userChanges[this.state.type.key] = this.state.value;

            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    let userInstance = usersReference.child(user.uid);
                    userInstance.update(userChanges)
                }
            });
        }
    };
    
    render(){
        let button = <Text style={styles.editText}>Modifier</Text>;

        if (this.state.type === FieldType.lastName || this.state.type === FieldType.firstName) {
            button = <Icon
                name={
                    Platform.OS === 'ios'
                        ? `ios-create`
                        : 'md-create'
                }
            />;
        }

        return (

            <View style={[styles.inputsRow, this.state.success ? styles.success : null]}>
                <TextInput
                    ref="field"
                    style={[styles.input, this.props.styles]}
                    placeholderTextColor = "#999999"
                    placeholder={this.state.type.placeHolder}
                    value={this.state.value}
                    onChangeText={(value) => this.setState({value: value})}
                    onSubmitEditing={() => this._updateDatabaseField()}
                    editable={this.state.isEditable}
                    secureTextEntry={FieldType.password === this.state.type}
                    returnKeyLabel='send'
                />
                <TouchableOpacity
                    onPress={() => this._focusField()}
                    style={{flex: 1, alignItems: "flex-end"}}
                >
                    {button}
                </TouchableOpacity>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    input: {
        fontWeight: "200",
        fontSize: 18,
        paddingBottom: 5,
        marginTop: 8,
        flex: 3
    },

    inputsRow: {
        flex: 1,
        flexDirection: "row",
        marginTop: 15,
        alignItems: "center",
    },

    success: {
        borderBottomWidth: 1,
        borderBottomColor: "#6cff94"
    },

    editText: {
        color: Colors.defaultColor,
        fontSize: 16
    }

});