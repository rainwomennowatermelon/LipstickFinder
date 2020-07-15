import React, { Component} from 'react';
import { ScrollView, View, Text, List, Picker, TextInput, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
// import Picker from 'react-native-picker';
import { styles, accountStyles } from '../../style/Styles.js';
import { Header } from './AccountHeader.js';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';


export default class Accounteditscreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      name: 'Paul Allen',
      profileUri: null,
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  }

  //change profiel image
  clickHead(){
      ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true,
          cropperCircleOverlay:true,
      }).then(response => {
        console.log('received image', response.path);
        this.setState({
          profileUri: response.path
        });
      })
      .catch((e) => {
        console.log(e);
        alert(e.message ? e.message : e);
      });
  }

  renderAvatar = () => {
    var profileUri = 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg';
    if (this.state.profileUri) {
      profileUri = this.state.profileUri;
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 90,
          marginBottom: 90,
        }}
      >
      <Avatar
        size={135}
        source={{uri: profileUri}}
        activeOpacity={0.7}
        avatarStyle={{ borderRadius: 145 / 2 }}
        overlayContainerStyle={{ backgroundColor: 'transparent' }}
        showAccessory
        onAccessoryPress={()=> this.clickHead()}
        // onPress={() => console.log('edit button pressed')}
      />
      </View>
    )
  }

  renderName = () =>{
    return(
      <Picker
        selectedValue={this.state.gender}
        style={{ height: 60}}
        onValueChange={this.updateGender}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
    );
  }

  render(){
    return (
      <>
        <Header title="Settings"/>
        <KeyboardAvoidingView
          style={{marginTop: 15, backgroundColor: 'rgba(241,240,241,1)' }}
        >

            {this.renderAvatar()}

            <View style={styles.list}>
              <ListItem
                title="Name"
                chevron
                bottomDivider
                input={{ placeholder: this.state.name}}
              />
              <ListItem
                title="Gender"
                buttonGroup={{
                  buttons: ['Male', 'Female', 'others'],
                  containerStyle: {height: 40},
                  selectedButtonStyle: {backgroundColor: '#CA7476'},
                  selectedIndex: this.state.selectedIndex,
                  onPress: (index) => this.updateIndex(index),
                }}
                bottomDivider
              />

            </View>

        </KeyboardAvoidingView>

      </>


    );
  }

}
