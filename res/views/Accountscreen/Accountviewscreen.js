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
import {COLORS} from '../../style/Colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {getData} from '../../utils/asyncstorage';
import RNFetchBlob from 'rn-fetch-blob';

const URLS = {
  USERINFO: 'http://124.156.143.125:5000/getUserInfo?',
  PROFILEIMAGE: 'http://124.156.143.125:5000/getUserProfileImage?',
  LIPSTICKLIKE: 'http://124.156.143.125:5000/getLipstickLike?',
};

const PROFILE_PATH = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';

export default class Accountviewscreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileUri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
      userName: 'Paul Allen',
      userID: null,
      pwd: null,
      lipsticks: [],
    };
  }

  async componentDidMount(){
    const userID = await getData("uid");
    const pwd = await getData("password");

    this.setState({userID: userID, pwd: pwd});

    fetch(URLS.USERINFO + `userID=${userID}&pwd=${pwd}`).then(response => response.json()).then(responseJ => {
      this.setState({
        userName: responseJ['name'],
      });
    }).catch(error => {
      console.error(error);
    });

    RNFetchBlob.fetch('GET', URLS.PROFILEIMAGE + `userID=${userID}&pwd=${pwd}`, {
      Authorization: 'Bearer access-token',
      'Content-Type': 'application/octet-stream',
    }).then(response => {
      this.setState({
          profileData: response['data'],
          profileMime: response['Content-Type'],
        });
      console.log(response.text());
      if (response.text() == "No image"){
        this.setState({profilePath: PROFILE_PATH});
      }
      else{ //display the image in DB
        this.setState({profilePath: `data:${this.state.profileMime};base64,${this.state.profileData}`});
      }

    }).catch(err => {
      alert(err);
    });

    // 'brand': 1, 'series': 1, 'liquid': 1, 'texture': 1, 'color': 1, 'price': 1, 'name': 1, 'lipstick_id': 1
    fetch(URLS.LIPSTICKLIKE + `userID=${userID}&pwd=${pwd}`).then(response => response.json()).then(res=> {
      console.log(res)
      this.setState({
        lipsticks: res,
      });
    }).catch(error => {
      console.error(error);
    });

  }


  render() {
    return (
      <>
        <Header title="Likes"/>
        <LinearGradient colors={[COLORS.PRIMARY_START, COLORS.PRIMARY_END]} start={{x: 0, y: 0}} end={{x: 0.8, y: 0.8}} style={styles.container}>
          <ScrollView style={{backgroundColor: 'transparent' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: 4,
                alignItems: 'center',
                marginHorizontal: 10,
                height: 140,
                marginTop: 15,
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
                <Avatar
                  size={115}
                  source={{uri: this.state.profilePath}}
                  activeOpacity={0.7}
                  avatarStyle={{ borderRadius: 145 / 2 }}
                  overlayContainerStyle={{ backgroundColor: 'transparent' }}
                />
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
            <View style={{marginHorizontal: 10}}>
              {this.state.lipsticks.map((l, index) => (
                <ListItem
                  key={index}
                  chevron
                  title={l.brand}
                  subtitle={l.series + l.name}
                  bottomDivider
                  leftIcon={{name: 'square-full', type: 'font-awesome-5', color: l.color}}/>
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </>
    );
  }
}
