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

const UserStack = createStackNavigator({
  Profile: UserScreen
});

UserStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-person`
                : 'md-person'
          }
      />
  ),
};

UserStack.path = '';

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-map`
                : 'md-map'
          }
      />
  ),
};

MapStack.path = '';

const AlarmStack = createStackNavigator({
  Alarm: AlarmScreen
});

AlarmStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-alert`
                : 'md-alert'
          }
      />
  ),
};

AlarmStack.path = '';

const MoreStack = createStackNavigator({
  More: MoreScreen
});

MoreStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-information`
                : 'md-information'
          }
      />
  ),
};

MoreStack.path = '';

export default createAppContainer(
    createBottomTabNavigator(
        {
          User: UserStack,
          Alarm: AlarmStack,
          Map: MapStack,
          More: MoreStack

        },
        {
            tabBarOptions: {
              showLabel: false, // hide labels
              style: {
                  backgroundColor: Colors.tabBar,
              },
              tabStyle: {
                  backgroundColor: Colors.tabBar,
              },
            },
            initialRouteName: "User"
        }
    )
);
