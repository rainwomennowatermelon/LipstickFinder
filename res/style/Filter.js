import React from 'react';
import {View} from 'react-native';
import {Slider} from 'react-native-elements';
import {Text} from 'native-base';
import {COLORS} from './Colors';

export default ({name, minimum, maximum, onChange, initValue}) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 300, paddingLeft: 20}}>
    <Text style={{textAlign: 'center'}}>{name}</Text>
    <Slider minimumValue={minimum} maximumValue={maximum} value={initValue} onValueChange={onChange}
            style={{width: 150}} thumbTintColor={COLORS.SLIDER_THUMB}/>
  </View>
);
