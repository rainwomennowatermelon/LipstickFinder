import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {Header} from './AccountHeader.js';

export default class Accountaboutscreen extends Component {
  render() {
    return (
      <>
        <Header title="About Us"/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: 260, height: 80, marginBottom: 20}}
            source={require('../../images/logo.png')}
          />
          <Text style={{fontSize: 18, marginBottom: 20}}>V 1.0</Text>

          <Text>A Mobile Application for Lipstick Recognition,</Text>
          <Text>Makeup, and Recommendation.</Text>

          <Text style={{marginTop: 20}}>More details: https://i.cs.hku.hk/~msp19019/</Text>
        </View>
      </>
    );
  }
}
