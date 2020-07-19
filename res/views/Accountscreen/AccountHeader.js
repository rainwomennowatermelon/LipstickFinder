import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header as HeaderRNE } from 'react-native-elements';
import { styles, accountStyles } from '../../style/Styles.js';


function Header(props) {
  const navigation = useNavigation();

  return (
    <HeaderRNE
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        onPress: navigation.openDrawer,
      }}
      centerComponent={{ text: props.title, style: accountStyles.heading }}
      containerStyle={{
        backgroundColor: 'black',
        justifyContent: 'space-around',
      }}
    />
  );
}

export { Header };
