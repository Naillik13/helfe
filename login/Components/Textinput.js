import React from 'react';
import {TextInput} from 'react-native';

export default function UselessTextInput() {
    const [value, onChangeText] = React.useState('Login');
  
    return (
      <TextInput
        style={{left: 50, height: 40, width: 300, borderColor: 'gray', borderWidth: 1, top: 550, borderRadius: 25, backgroundColor: '#b3cdfb', textAlign: "center", color: "#ffffff"}}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
    );
  }

export default Textinput