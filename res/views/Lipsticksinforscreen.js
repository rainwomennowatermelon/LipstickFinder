import React, {Component} from 'react';
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData} from '../utils/asyncstorage';

const URLS = {
  MARKIFLIKE: 'http://124.156.143.125:5000/markIfLike?',
};

export default class Accountscreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      color: this.props.route.params.color,
      like: this.props.route.params.like,
      colorScheme: this.props.route.params.colorScheme,
      shown: this.props.route.params.shown,
      type: this.props.route.params.type? '唇釉': '唇膏',
      brand: this.props.route.params.brand,
      lipstickid: this.props.route.params.lipstickid,
      price: this.props.route.params.price,
    };
    console.log(this.state);
  }

  onPress() {
    console.log(this.state.name);
    console.log(this.state.color);
  }

  taobao(name) {
    Linking.openURL('https://s.taobao.com/search?q=' + name);
  }

  amazon(name) {
    Linking.openURL('https://www.amazon.com/s?k=' + name);
  }

  ebay(name) {
    Linking.openURL('https://www.ebay.com.hk/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=' + name + '&_sacat=0');
  }

  squareStyle(color) {
    return {
      width: 150,
      height: 120,
      backgroundColor: color,
    };
  }

  changeLikeLabel = async() =>{

    const beforeLikeLabel = this.state.like;
    this.setState({like: !beforeLikeLabel});

    const userID = await getData("uid");
    const pwd = await getData("password");
    console.log(this.state.lipstickid);
    fetch(URLS.MARKIFLIKE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: userID,
        pwd: pwd,
        likeLipstickID: this.state.lipstickid,
        likeLabel: !beforeLikeLabel,
      })
    });

  }
  render() {

    return (
      <>
        <View style={styles.container}>
          <View style={styles.firstRow}>
            <View style={this.squareStyle(this.state.color)}>
            </View>
          </View>
          <View style={styles.secondRow}>
            <View style={styles.col}>
              <Text style={styles.lipstickName}>
                {this.state.name}
              </Text>
              <Text style={styles.lipstickInfo}>
                {this.state.brand} / {this.state.type} / {this.state.shown} / ￥{this.state.price}
              </Text>
            </View>
            <View style={styles.transparentSquare}>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.changeLikeLabel()}>
              <Icon
                size={50}
                name={'heart-box-outline'}
                style={{ color: this.state.like ?'#CA7476':'black'}}>
              </Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.thirdRow}>
            <View style={styles.transparentSquare}>
            </View>
          </View>
          <View style={styles.fourthRow}>
            <View style={styles.transparentSquare}>
            </View>
            <Text style={styles.buy}>
              Where to Buy
            </Text>
          </View>
          <View style={styles.fifthRow}>
            <View style={styles.transparentSquare}>
            </View>
            <TouchableOpacity
              onPress={() => this.taobao(this.state.name)}
              style={styles.icon}
              activeOpacity={0.5}>
              <Image source={require('../images/taobao.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.amazon(this.state.name)}
              style={styles.icon}
              activeOpacity={0.5}>
              <Image source={require('../images/amazon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.ebay(this.state.name)}
              style={styles.icon}
              activeOpacity={0.5}>
              <Image source={require('../images/ebay.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstRow: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  fourthRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  fifthRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  col: {
    width: '50%',
    padding: 5,
  },
  lipstickName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  lipstickInfo: {
    color: '#adadadff',
    fontSize: 14,
  },
  buy: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    padding: 3,
  },
  square: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
  },
  transparentSquare: {
    width: 50,
    height: 30,
    backgroundColor: 'transparent',
  },
});
