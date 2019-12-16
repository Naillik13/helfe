import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import TabBarIcon from "./src/components/TabBarIcon"
import {Platform, Text} from "react-native"
import Colors from "./src/constants/Colors"

import UserScreen from "./src/screens/UserScreen";
import MapScreen from "./src/screens/MapScreen";
import MoreScreen from "./src/screens/MoreScreen";
import AlarmScreen from "./src/screens/AlarmScreen";

import AppNavigation from "./navigation/AppNavigation";



export default createAppContainer(
    AppNavigation
);
