import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, Button, Icon, ListItem, Header } from 'react-native-elements';



export default class Accountscreen extends Component {
	
	constructor(props) {
        super(props);
		this.state = {name:this.props.route.params.name,
					  color:this.props.route.params.color,
					  like:this.props.route.params.like,
					  colorScheme:this.props.route.params.colorScheme,
					  shown:this.props.route.params.shown,
					  type:this.props.route.params.type}
    }
	
	onPress(){
		console.log(this.state.name);
		console.log(this.state.color);
	}
	
	taobao(name){
		Linking.openURL('https://s.taobao.com/search?q=' + name);
	}
	
	amazon(name){
		Linking.openURL('https://www.amazon.com/s?k=' + name);
	}
	
	ebay(name){
		Linking.openURL('https://www.ebay.com.hk/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=' + name + '&_sacat=0');
	}
	
	squareStyle(color){
		return {
			width: 100,
			height: 80,
			backgroundColor: color  
		}
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
                            {this.state.type} / {this.state.shown} / {this.state.colorScheme}
                        </Text>
					</View>
					<View style={styles.transparentSquare}>
					</View>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={ () => this.setState({ like : !this.state.like }) }>
						<Image source={ this.state.like ?                  
							require('../images/like-red.png') : 
							require('../images/like-white.png')}
						/>
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
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent:'center',
		backgroundColor: 'white',
		//alignItems:'center'
	},
	firstRow: {
		flexDirection: "row",
		justifyContent:'center',
		alignItems:'center',
		padding:8
	},
	secondRow: {
		flexDirection: "row",
		justifyContent:'center',
		alignItems:'center'
	},
	thirdRow: {
		flexDirection: "row",
		justifyContent:'center',
		alignItems:'center',
		padding:8
	},
	fourthRow: {
		flexDirection: "row",
		alignItems:'flex-start'
	},
	fifthRow: {
		flexDirection: "row",
		alignItems:'flex-start'
	},
	col: {
		flexDirection: "column",
		alignItems:'flex-start',
		padding:5
	},
	lipstickName:{
		fontWeight:'bold',
		fontSize:24
	},
	lipstickInfo:{
		color:'#adadadff',
		fontSize:14
	},
	buy:{
		fontWeight:'bold',
		fontSize:16
	},
	icon:{
		padding:3
	},
	square:{
		width: 60,
		height: 60,
		backgroundColor: 'red'
	},
	transparentSquare:{
		width: 50,
		height: 30,
		backgroundColor: 'transparent'
	}
});