import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {COLORS} from '../style/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {getData} from '../utils/asyncstorage';

const URLS = {
  MARKIFLIKE: 'http://124.156.143.125:5000/markIfLike?',
  RECOMMENDLIST: 'http://124.156.143.125:5000/getRecommendLipstickInfo',
  LIPSTICKLIKE: 'http://124.156.143.125:5000/getLipstickLike?',
};

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

  componentDidMount = async () => {

    const userID = await getData('uid');
    const password = await getData('password');

    fetch(URLS.RECOMMENDLIST, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        password: password,
      }),
    }).then(response => response.json()).then(responseJson => {
      this.setState({lipstickInfos: responseJson.recommendLipstickInfoVos});
    }).catch((error) => {
      console.error(error);
    });

    this.props.navigation.addListener('focus', () => {
      this.refresh();
      // alert('Screen was focused')
    });
  };

  // refresh like label
  refresh = async() => {
    const userID = await getData("uid");
    const pwd = await getData("password");
    let likeLipstickID = [];

    fetch(URLS.LIPSTICKLIKE + `userID=${userID}&pwd=${pwd}`).then(response => response.json(),
    ).then(res => {
      console.log(res);
      res.forEach((item, i) => {
        likeLipstickID.push(item['lipstick_id']);
      });
      console.log(likeLipstickID);
      let recom = this.state.lipstickInfos;
      recom.forEach((item, i) => {
        item['like'] = likeLipstickID.includes(item['lipstick_id']);
      });
      this.setState({lipstickInfos: recom});

    }).catch(error => {
      console.error(error);
    });

  }

  lipstickInfoPress(index) {
    this.props.navigation.navigate('LipsticksInfor', {
      name: this.state.lipstickInfos[index].name,
      color: this.state.lipstickInfos[index].color,
      like: this.state.lipstickInfos[index].like,
      colorScheme: this.state.lipstickInfos[index].colorScheme,
      shown: this.state.lipstickInfos[index].texture,
      type: this.state.lipstickInfos[index].liquid,
      brand: this.state.lipstickInfos[index].brand,
      lipstickid: this.state.lipstickInfos[index].lipstick_id,
      price: this.state.lipstickInfos[index].price,
    });
  }

  updateLike = async (index) => {
    this.state.lipstickInfos[index].like = !this.state.lipstickInfos[index].like;
    this.forceUpdate();

    const likeLabel = this.state.lipstickInfos[index].like;
    const userID = await getData('uid');
    const pwd = await getData('password');
    const lipstickID = this.state.lipstickInfos[index].lipstick_id;
    console.log(lipstickID);
    fetch(URLS.MARKIFLIKE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        pwd: pwd,
        likeLipstickID: lipstickID,
        likeLabel: likeLabel,
      }),
    });
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
                containerStyle={{borderRadius: 10, height: 100}}
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
  },
});
