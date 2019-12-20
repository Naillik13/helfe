import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import {Platform} from "react-native";

export default function AlertMarker() {
    return (
        <Ionicons
            name={Platform.OS === 'ios'
                ? `ios-alert`
                : 'md-alert'}
            size={26}
            color={Colors.alertColor}
        />
    );
}