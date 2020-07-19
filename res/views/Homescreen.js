import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {COLORS} from '../style/Colors';
import LinearGradient from 'react-native-linear-gradient';

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

  updateLike = (index) => {
    this.state.lipstickInfos[index].like = !this.state.lipstickInfos[index].like;
    this.forceUpdate();
  };

  render() {
    return (
      <LinearGradient colors={[COLORS.PRIMARY_START, COLORS.PRIMARY_END]} start={{x: 0, y: 0}} end={{x: 0.8, y: 0.8}} style={styles.container}>
        <ScrollView>
          <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.recommend}>Daily Recommendation</Text>
          </View>
          <View style={{marginTop: -20}}>
            {this.state.lipstickInfos.map((l, index) => (
              <ListItem
                containerStyle={{borderRadius: 10}}
                underlayColor='transparent'
                style={styles.row}
                key={index}
                leftIcon={{name: 'square-full', type: 'font-awesome-5', color: l.color}}
                rightIcon={{name: l.like ? 'heart' : 'heart-o', type: 'font-awesome', color: l.like ? COLORS.HEART : 'grey'}}
                title={l.brand}
                subtitle={l.series + ': ' + l.name}
                bottomDivider
                onPress={() => this.updateLike(index)}
                onLongPress={() => this.lipstickInfoPress(index)}
              />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 10,
  },
  row: {
    marginBottom: 10,
  },
  recommend: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    shadowColor: '#2b5876', //only ios
    shadowOffset: {
    	width: 5,
    	height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation:1.5, //only android >=android 5.0
    textAlign: 'center',
  },
});
