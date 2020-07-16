import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    LayoutAnimation,
} from 'react-native';
import {styles} from '../style/Styles.js';

export default class Loginscreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '0',
            password: '0',
        };
    };

    onLoginButtonPress = () => {
        const emailValid = this.validate_email();
        const passwordValid = this.validate_password();
        if (emailValid && passwordValid) {
            this.verify_account();
        } else {
            LayoutAnimation.easeInEaseOut();
            Alert.alert('Invalid Email or Password Format');
        }
    };

    onRegisterButtonPress = () => {
        this.props.navigation.navigate('Register');
    }

    onTestFunctionsButtonPress = () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Root'}],
        });
    }

    validate_email = () => {
        const {email} = this.state;
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValid = re.test(email);
        return emailValid;
    }

    validate_password = () => {
        const {password} = this.state;
        const passwordValid = password.length >= 8;
        return passwordValid;
    }

    verify_account = () => {
        const {email} = this.state;
        const {password} = this.state;
        let formData = new FormData();

        fetch('http://124.156.143.125:5000/checkLoginInfo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.result == "True") {
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{name: 'Root'}],
                    });
                } else {
                    LayoutAnimation.easeInEaseOut();
                    Alert.alert('False Email or Password');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.ViewForHeader}>
                    <Text style={styles.Header}>
                        Welcome to Lipstick Finder
                    </Text>
                </View>

                <View style={styles.ViewForAccountInput}>
                    <TextInput
                        placeholder="Please Input Email"
                        style={styles.AccountInput}
                        onChangeText={(email) => this.setState({email})}
                    />
                </View>

                <View style={styles.ViewForAccountInput}>
                    <TextInput
                        placeholder="Please Input Password"
                        style={styles.AccountInput}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.AccountButton}
                    onPress={this.onLoginButtonPress.bind(this)}>
                    <Text style={styles.AccountButtonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.AccountButton}
                    onPress={this.onRegisterButtonPress.bind(this)}>
                    <Text style={styles.AccountButtonText}>
                        Register
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.AccountButton}
                    onPress={this.onTestFunctionsButtonPress.bind(this)}>
                    <Text style={styles.AccountButtonText}>
                        Test Functions
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}
