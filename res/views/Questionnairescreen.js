import React, {Component} from 'react';
import {
  Alert,
  ScrollView,
  LayoutAnimation,
  FlatList,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {styles} from '../style/Styles';
import {getData, removeData, storeData} from '../utils/asyncstorage';

var gender = ["male", "female"];
var kind = ["Lipstick", "Lip glaze"];
var texture = ["Glossy", "Mattle"];
var color = ["Red", "Pink", "Orange"];

export default class Questionnairescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      genderSelected: [],
      kindSelected: [],
      textureSelected: [],
      colorSelected: [],
    };
  };

  onOkButtonPress = () => {
    if (!this.checkGener()) {

    } else if (!this.checkKind()) {

    } else if (!this.checkTexture()) {

    } else if (!this.checkColor()) {

    } else {
      this.uploadQuestionaire();
    }
  };

  checkGener = () => {
    const {genderSelected} = this.state;
    let count = 0;
    for (var i = 0; i < gender.length; i++) {
      if (genderSelected[i] == true)
        count++;
    }
    if (count != 1) {
      Alert.alert('Please give one choice in gender!');
      return false;
    } else {
      return true;
    }
  };

  checkKind = () => {
    const {kindSelected} = this.state;
    let count = 0;
    for (var i = 0; i < kind.length; i++) {
      if (kindSelected[i] == true)
        count++;
    }
    if (count == 0) {
      Alert.alert('Please give at least one choice in kind!');
      return false;
    } else {
      return true;
    }
  };

  checkTexture = () => {
    const {textureSelected} = this.state;
    let count = 0;
    for (var i = 0; i < kind.length; i++) {
      if (textureSelected[i] == true)
        count++;
    }
    if (count == 0) {
      Alert.alert('Please give at least one choice in texture!');
      return false;
    } else {
      return true;
    }
  };

  checkColor = () => {
    const {colorSelected} = this.state;
    let count = 0;
    for (var i = 0; i < color.length; i++) {
      if (colorSelected[i] == true)
        count++;
    }
    if (count == 0) {
      Alert.alert('Please give at least one choice in kind!');
      return false;
    } else {
      return true;
    }
  };

  setGener = () => {
    let genderUpload = "";
    for (var i = 0; i < gender.length; i++) {
      if (this.state.genderSelected[i] == true) {
        genderUpload = gender[i];
        break;
      }
    }
    return genderUpload
  };

  setKind = () => {
    let kindUpload = [];
    for (var i = 0; i < kind.length; i++) {
      if (this.state.kindSelected[i] == true)
        kindUpload.push(kind[i]);
    }
    return kindUpload;
  };

  setTexture = () => {
    let textureUpload = [];
    for (var i = 0; i < texture.length; i++) {
      if (this.state.textureSelected[i] == true)
        textureUpload.push(texture[i]);
    }
    return textureUpload;
  };

  setColor = () => {
    let colorUpload = [];
    for (var i = 0; i < color.length; i++) {
      if (this.state.colorSelected[i] == true)
        colorUpload.push(color[i]);
    }
    return colorUpload;
  };

  uploadQuestionaire = async() => {
    let email = await getData("email");
    let password = await getData("password");

    let uploadGender = this.setGener();
    let uploadKind = this.setKind();
    let uploadTexture = this.setTexture();
    let uploadColor = this.setColor();

    console.log(email);
    console.log(password);
    console.log(uploadGender);
    console.log(uploadKind);
    console.log(uploadTexture);
    console.log(uploadColor);
    fetch('http://124.156.143.125:5000/uploadQuestionnaire', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        gender: this.setGener(),
        kind: this.setKind(),
        texture: this.setTexture(),
        color: this.setColor(),
      })
    })
    .then((response) => response.json())
     .then((responseJson) => {
      if (responseJson.result == "True") {
        this.props.navigation.navigate('Login');
      } else if (responseJson.result == "False") {
        LayoutAnimation.easeInEaseOut();
        Alert.alert('Upload Encounter Problems!');
      }
    })
     .catch((error) => {
      console.error(error);
    });
  };

  handleGenderChange = (index) => {
    let selected = this.state.genderSelected;
    selected[index] = !selected[index];
    this.setState({genderSelected: selected});
  }

  renderGenderChoice = () => {
    const {genderSelected} = this.state;
    return (
      <View style={styles.choices}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={styles.questions}>1. Choose the gender you belong to:</Text>
        </View>
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[
                  style.separator,
                  highlighted && {marginLeft: 0}
                ]}
              />
            ))
          }
          keyExtractor={(item, index) => 'key'+index}
          horizontal={false}
          numColumns={2}
          data={gender}
          extraData={this.state}
          renderItem={({item, index, separators}) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                onValueChange={() => this.handleGenderChange(index)}
                value={this.state.genderSelected[index]}
              />
              <Text style={styles.label}>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  handleKindChange = (index) => {
    let selected = this.state.kindSelected;
    selected[index] = !selected[index];
    this.setState({kindSelected: selected});
  }

  renderKindChoice = () => {
    const {kindSelected} = this.state;
    return (
      <View style={styles.choices}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={styles.questions}>2. Choose the kind of Lipsticks you like:</Text>
        </View>
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[
                  style.separator,
                  highlighted && {marginLeft: 0}
                ]}
              />
            ))
          }
          keyExtractor={(item, index) => 'key'+index}
          horizontal={false}
          numColumns={2}
          data={kind}
          extraData={this.state}
          renderItem={({item, index, separators}) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                onValueChange={() => this.handleKindChange(index)}
                value={this.state.kindSelected[index]}
              />
              <Text style={styles.label}>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  handleTextureChange = (index) => {
    let selected = this.state.textureSelected;
    selected[index] = !selected[index];
    this.setState({textureSelected: selected});
  }

  renderTextureChoice = () => {
    return (
      <View style={styles.choices}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={styles.questions}>3. Choose the texture of Lipsticks you like:</Text>
        </View>
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[
                  style.separator,
                  highlighted && {marginLeft: 0}
                ]}
              />
            ))
          }
          keyExtractor={(item, index) => 'key'+index}
          horizontal={false}
          numColumns={2}
          data={texture}
          extraData={this.state}
          renderItem={({item, index, separators}) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                onValueChange={() => this.handleTextureChange(index)}
                value={this.state.textureSelected[index]}
              />
              <Text style={styles.label}>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  handleColorChange = (index) => {
    let selected = this.state.colorSelected;
    selected[index] = !selected[index];
    this.setState({colorSelected: selected});
  }

  renderColorChoice = () => {
    const {colorSelected} = this.state;
    return (
      <View style={styles.choices}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={styles.questions}>4. Choose the color of Lipsticks you like:</Text>
        </View>
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[
                  style.separator,
                  highlighted && {marginLeft: 0}
                ]}
              />
            ))
          }
          keyExtractor={(item, index) => 'key'+index}
          horizontal={false}
          numColumns={2}
          data={color}
          extraData={this.state}
          renderItem={({item, index, separators}) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                onValueChange={() => this.handleColorChange(index)}
                value={this.state.colorSelected[index]}
              />
              <Text style={styles.label}>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.Container}>
        <ScrollView>
          {this.renderGenderChoice()}
          {this.renderKindChoice()}
          {this.renderTextureChoice()}
          {this.renderColorChoice()}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.AccountButton}
          onPress={this.onOkButtonPress.bind(this)}>
          <Text style={styles.AccountButtonText}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
