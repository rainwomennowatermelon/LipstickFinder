import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView,
  Keyboard,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles, accountStyles } from '../../style/Styles.js';
import { Header } from './AccountHeader.js';

export default class Changepwdscreen extends Component {

  static defaultProps = {
        placeHolderCurrentPassword:"Current Password",
        placeHolderNewPassword:"New Password",
        placeHolderConfirmPassword:"Confirm Password"
  };

  constructor(props) {
      super(props);
      this.state = {
          newPassword: "",
          currentPassword: "",
          confirmPassword: ""
      };
  }

  onbtnSavePress() {
      if (this.state.currentPassword.trim().length == 0) {
          console.log("Please enter current password");
      } else if (this.state.newPassword.trim().length == 0) {
          console.log("Please enter new password");
      } else if (this.state.newPassword != this.state.confirmPassword) {
          console.log("Password dose not match");
      } else {
          Keyboard.dismiss();
          this.changePassword();
      }
  }

  changePassword() {

  }

  render() {
    return (
      <>
        <Header title="Reset Password"/>
        <View style={accountStyles.container}>
            <View style={[accountStyles.bottomView,{backgroundColor:this.props.backgroundColor}]}>
            <View style={accountStyles.inputView}>
                <TextInput style={accountStyles.inputText} placeholder={this.props.placeHolderCurrentPassword}
                    multiline={false} placeholderTextColor={"#3c3c3c"} autoCorrect={false} underlineColorAndroid={'transparent'}  secureTextEntry={true} onChangeText={(currentPassword) => this.setState({currentPassword})} value={this.state.currentPassword}></TextInput>
            </View>
            <View style={accountStyles.inputView}>
                <TextInput style={accountStyles.inputText} placeholder={this.props.placeHolderNewPassword}
                    multiline={false} placeholderTextColor={"#3c3c3c"} autoCorrect={false} underlineColorAndroid={'transparent'}  secureTextEntry={true} onChangeText={(newPassword) => this.setState({newPassword})} value={this.state.newPassword}></TextInput>
            </View>
            <View style={accountStyles.inputView}>
                <TextInput style={accountStyles.inputText} placeholder={this.props.placeHolderConfirmPassword}
                    multiline={false} placeholderTextColor={"#3c3c3c"} autoCorrect={false} underlineColorAndroid={'transparent'}  secureTextEntry={true} onChangeText={(confirmPassword) => this.setState({confirmPassword})} value={this.state.confirmPassword}></TextInput>
            </View>
            <TouchableOpacity style={accountStyles.btnSave} activeOpacity={0.6} onPress={() => this.onbtnSavePress()}>
                <Text style={accountStyles.textSave} numberOfLines={1}>Done</Text>
            </TouchableOpacity>
            </View>
        </View>

      </>
    );
  }
}
