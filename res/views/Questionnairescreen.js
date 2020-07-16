import React, {Component} from 'react';
import {
    ScrollView,
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

var gender = ["male", "female"];
var kind = ["Lipstick", "Lip glaze"];
var texture = ["Glossy", "Mattle"];
var color = ["Red", "Pink", "Orange"];

export default class Questionnairescreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.route.params.email,
            password: this.props.route.params.password,
            isSelected: false,
            genderSelected: [false, false],
            kindSelected: [false, false],
            textureSelected: [false, false],
            colorSelected: [false, false, false],
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
        for (i = 0; i < gender.length; i++) {
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
        for (i = 0; i < kind.length; i++) {
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
        for (i = 0; i < kind.length; i++) {
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

    setGener = () => {
        let genderUpload = "";
        for (i = 0; i < gender.length; i++) {
            if (genderSelected[i] == true) {
                genderUpload = gender[i];
                break;
            }
        }
        return genderUpload
    };

    setKind = () => {
        let kindUpload = [];
        for (i = 0; i < kind.length; i++) {
            if (kindSelected[i] == true)
                kindUpload.push(kind[i]);
        }
        return kindUpload;
    };

    setTexture = () => {
        let textureUpload = [];
        for (i = 0; i < texture.length; i++) {
            if (textureSelected[i] == true)
                textureUpload.push(kind[i]);
        }
        return textureUpload;
    };

    setColor = () => {
        let colorUpload = [];
        for (i = 0; i < color.length; i++) {
            if (colorSelected[i] == true)
                colorUpload.push(color[i]);
        }
        return colorUpload;
    };

    uploadQuestionaire = () => {
        const {email} = this.state;
        const {password} = this.state;
        fetch('http://124.156.143.125:5000/uploadQuestionaire', {
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
                horizontal={false}
                numColumns={3}
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
                horizontal={false}
                numColumns={3}
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
        );
    }

    handleTextureChange = (index) => {
        let selected = this.state.textureSelected;
        selected[index] = !selected[index];
        this.setState({textureSelected: selected});
    }

    renderTextureChoice = () => {
        const {kindSelected} = this.state;
        return (
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
                horizontal={false}
                numColumns={3}
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
                horizontal={false}
                numColumns={3}
                data={color}
                extraData={this.state}
                renderItem={({item, index, separators}) => (
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            onValueChange={() => this.handleTextureChange(index)}
                            value={this.state.colorSelected[index]}
                        />
                        <Text style={styles.label}>{item}</Text>
                    </View>
                )}
            />
        );
    }

    render() {
        return (
            <View style={styles.Container}>
                {this.renderGenderChoice()}
                {this.renderKindChoice()}
                {this.renderTextureChoice()}
                {this.renderColorChoice()}

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