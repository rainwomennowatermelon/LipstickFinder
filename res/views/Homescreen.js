import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
                color: l.color,
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
