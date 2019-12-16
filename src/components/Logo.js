import React, { Component } from 'react';
import { View, Image} from 'react-native';


class Logo extends Component {
  render() {
    return (
      <View> 
        <Image
          style={{width: 150, 
                  height: 150,
                  left: 125,
                  top: 180,
                  borderRadius: 50,
                  }}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />      
      </View>)
  }
}

export default Logo
