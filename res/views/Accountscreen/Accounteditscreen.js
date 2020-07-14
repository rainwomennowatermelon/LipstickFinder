import React, { Component } from 'react';
import { ScrollView, View, Text, List, Picker, TextInput, KeyboardAvoidingView } from 'react-native';
// import Picker from 'react-native-picker';
import { styles, accountStyles } from '../../style/Styles.js';
import { Header } from './AccountHeader.js';


export default class Accounteditscreen extends Component{
  state = {
    name: 'Paul',
    gender: ''
  }
  updateGender = (gender) =>{
    this.setState({gender: gender})
  }

  render(){
    return (
      <>
        <Header title="Settings"/>
        <KeyboardAvoidingView
          style={{marginTop: 15, backgroundColor: 'rgba(241,240,241,1)' }}
        >

            <View
              style={{
                marginHorizontal: 10,
              }}
            >

              <Text style={accountStyles.Gtext}>Name</Text>
              <TextInput
                placeholder={this.state.name}
                style={accountStyles.Ninput}
              />

              <Text style={accountStyles.Gtext}>Gender</Text>
              <Picker
                selectedValue={this.state.gender}
                style={{ height: 60}}
                onValueChange={this.updateGender}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Others" value="Others" />
              </Picker>

            </View>
        </KeyboardAvoidingView>

      </>


    );
  }

}
