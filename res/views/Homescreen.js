import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class Homescreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lipstickInfos: [
        {'name': 'loading', 'color': '#2f1212', 'like': false},
        {'name': 'loading', 'color': '#2f1212', 'like': false},
        {'name': 'loading', 'color': '#2f1212', 'like': false},
        {'name': 'loading', 'color': '#2f1212', 'like': false},
        {'name': 'loading', 'color': '#2f1212', 'like': false}],
    };
  }

  componentDidMount() {
    fetch('http://124.156.143.125:5000/getRecommendLipstickInfo').then(response => response.json()).then(responseJson => {
      this.setState({lipstickInfos: responseJson.recommendLipstickInfoVos});
    }).catch(error => {
      console.error(error);
    });
  };

  lipstickInfoPress(index) {
    this.state.lipstickInfos[0].like = this.state.lipstick1Like;
    this.state.lipstickInfos[1].like = this.state.lipstick2Like;
    this.state.lipstickInfos[2].like = this.state.lipstick3Like;
    this.state.lipstickInfos[3].like = this.state.lipstick4Like;
    this.state.lipstickInfos[4].like = this.state.lipstick5Like;
    this.props.navigation.navigate('LipsticksInfor', {
      name: this.state.lipstickInfos[index].name,
      color: this.state.lipstickInfos[index].color,
      like: this.state.lipstickInfos[index].like,
      colorScheme: this.state.lipstickInfos[index].colorScheme,
      shown: this.state.lipstickInfos[index].texture,
      type: this.state.lipstickInfos[index].liquid,
    });
  }

  circleStyle(color) {
    return {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      backgroundColor: color,
      //borderColor: 'black',
      //borderWidth: 2
    };
  };

  updateLike = (index) => {
    this.state.lipstickInfos[index].like = !this.state.lipstickInfos[index].like;
    this.forceUpdate();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.recommend}>Daily Recommendation</Text>
        <ScrollView>
          {this.state.lipstickInfos.map((l, index) => (
            <ListItem
              key={index}
              leftIcon={{
                name: 'square-full',
                type: 'font-awesome-5',
                color: '#d13d3d',
              }}
              rightIcon={{
                name: l.like ? 'heart' : 'heart-o',
                type: 'font-awesome',
                color: l.like ? '#d13d3d' : 'grey',
              }}
              title={l.brand}
              subtitle={l.series + ': ' + l.name}
              bottomDivider
              onPress={() => this.lipstickInfoPress(index)}
              onLongPress={() => this.updateLike(index)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  render_() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.recommend}>
            Recommend for You
          </Text>
          <View style={styles.transparentSquare}>
          </View>
          <View style={styles.row}>
            <View style={this.circleStyle(this.state.lipstickInfos[0].color)}>
            </View>
            <Text style={styles.lipstickName}>
              {this.state.lipstickInfos[0].name}
            </Text>
            <TouchableOpacity
              style={styles.transparentSquare}
              activeOpacity={0.5}
              onPress={() => this.lipstickInfoPress(0)}>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => this.setState({lipstick1Like: !this.state.lipstick1Like})}>
              <Image source={this.state.lipstick1Like ?
                require('../images/star-yellow.png') :
                require('../images/star-black.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={this.circleStyle(this.state.lipstickInfos[1].color)}>
            </View>
            <Text style={styles.lipstickName}>
              {this.state.lipstickInfos[1].name}
            </Text>
            <TouchableOpacity
              style={styles.transparentSquare}
              activeOpacity={0.5}
              onPress={() => this.lipstickInfoPress(1)}>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => this.setState({lipstick2Like: !this.state.lipstick2Like})}>
              <Image source={this.state.lipstick2Like ?
                require('../images/star-yellow.png') :
                require('../images/star-black.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={this.circleStyle(this.state.lipstickInfos[2].color)}>
            </View>
            <Text style={styles.lipstickName}>
              {this.state.lipstickInfos[2].name}
            </Text>
            <TouchableOpacity
              style={styles.transparentSquare}
              activeOpacity={0.5}
              onPress={() => this.lipstickInfoPress(2)}>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => this.setState({lipstick3Like: !this.state.lipstick3Like})}>
              <Image source={this.state.lipstick3Like ?
                require('../images/star-yellow.png') :
                require('../images/star-black.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={this.circleStyle(this.state.lipstickInfos[3].color)}>
            </View>
            <Text style={styles.lipstickName}>
              {this.state.lipstickInfos[3].name}
            </Text>
            <TouchableOpacity
              style={styles.transparentSquare}
              activeOpacity={0.5}
              onPress={() => this.lipstickInfoPress(3)}>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => this.setState({lipstick4Like: !this.state.lipstick4Like})}>
              <Image source={this.state.lipstick4Like ?
                require('../images/star-yellow.png') :
                require('../images/star-black.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={this.circleStyle(this.state.lipstickInfos[4].color)}>
            </View>
            <Text style={styles.lipstickName}>
              {this.state.lipstickInfos[4].name}
            </Text>
            <TouchableOpacity
              style={styles.transparentSquare}
              activeOpacity={0.5}
              onPress={() => this.lipstickInfoPress(4)}>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => this.setState({lipstick5Like: !this.state.lipstick5Like})}>
              <Image source={this.state.lipstick5Like ?
                require('../images/star-yellow.png') :
                require('../images/star-black.png')}
              />
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
    justifyContent: 'center',
  },
  row: {
    left: 25,
    flexDirection: 'row',
    //justifyContent:'center',
    alignItems: 'center',
    padding: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 10,
  },
  button: {
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  transparentSquare: {
    width: 110,
    height: 100,
    backgroundColor: 'transparent',
  },
  lipstickName: {
    padding: 12,
    fontSize: 18,
  },
  recommend: {
    flex: 1,
    margin: 20,
    fontSize: 26,
    fontWeight: 'bold',
  },
});
