import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AppNavigation from "./navigation/AppNavigation";

import * as firebase from "firebase";
import SignInScreen from "./src/screens/SignInScreen";
import LoginScreen from "./src/screens/LoginScreen";
import {createStackNavigator} from "react-navigation-stack";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";

firebase.initializeApp({
    apiKey: "AIzaSyClvKKxYhr7sx9QoICnOjUQRMLzx1EFkbk",
    authDomain: "rnfirebase-1d7bf.firebaseapp.com",
    databaseURL: "https://rnfirebase-1d7bf.firebaseio.com",
    projectId: "rnfirebase-1d7bf",
    storageBucket: "rnfirebase-1d7bf.appspot.com",
});

const LoginStack = createStackNavigator({
    Login: LoginScreen,
    SignIn: SignInScreen
});

LoginStack.path = '';

const App = createSwitchNavigator({
    AuthLoading : {
        screen: AuthLoadingScreen
    },
    Auth: {
        screen: LoginStack,
    },
    App: {
        screen: AppNavigation,
    },
});

export default createAppContainer(App);

