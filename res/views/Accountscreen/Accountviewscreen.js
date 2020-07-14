// Aboutscreen.js
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  FlatList
} from 'react-native';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import { styles, accountStyles } from '../../style/Styles.js';
import { Header } from './AccountHeader.js';
import ImagePicker from 'react-native-image-crop-picker';

const list = [
  {
    name: 'YSL 416',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Lip Glaze',
  },
  {
    name: 'YSL 80',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Lipstick',
  },
  {
    name: 'YSL 416',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Lip Glaze',
  },
  {
    name: 'YSL 80',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Lipstick',
  },
  {
    name: 'YSL 416',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Lip Glaze',
  },
  {
    name: 'YSL 80',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Lipstick',
  },
  {
    name: 'YSL 416',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Lip Glaze',
  },
  {
    name: 'YSL 80',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Lipstick',
  },
];

export default class Accountviewscreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileUri: null,
      userName: 'Paul Allen',
    };
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      leftAvatar={{
        source: { uri: item.avatar_url }
      }}
      title={item.name}
      subtitle={item.subtitle}
      bottomDivider
      chevron
      onPress
    />
  )

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
    )
  }


  render() {
    return (
      <>
        <Header title="Likes"/>
        <ScrollView
          style={{ marginTop: 15, backgroundColor: 'rgba(241,240,241,1)' }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: 4,
              alignItems: 'center',
              marginHorizontal: 10,
              height: 175,
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
              {this.renderAvatar()}
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#79797A',
                      marginLeft: -15,
                    }}
                  >
                    {this.state.userName}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <FlatList
              keyExtractor={this.keyExtractor}
              data={list}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}
