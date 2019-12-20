import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import {Platform} from "react-native";

export default function LocationMarker() {
    return (
        <Ionicons
            name={Platform.OS === 'ios'
                ? `ios-pin`
                : 'md-pin'}
            size={26}
            color={Colors.tintColor}
        />
    );
}