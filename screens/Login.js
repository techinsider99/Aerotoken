/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			pin: '',
			secured: true,
			iconType: 'eye-slash',
			error: '',
		};
	}

	handlePin = pin => this.setState({ pin: pin })

	handleSecuredEntry = () => {
		let icon = this.state.iconType;
		if (icon === 'eye-slash') {
			this.setState({
				iconType: 'eye',
				secured: false,
			});
		} else {
			this.setState({
				iconType: 'eye-slash',
				secured: true,
			});
		}
	}

	handlePinSubmit = async () => {
		let pin  = this.state.pin;
		let password = await AsyncStorage.getItem('@pin');
		if (pin === password) {
			this.setState({
                error: '',
            }, () => this.props.navigation.replace('Dashboard'));
            this.setState({ pin: '' });
		} else {
			this.setState({ error: 'Enter a pin/valid pin to continue' });
		}
	}

    render() {
		const styles = StyleSheet.create({
			statusBar: {
                width: '100%',
                backgroundColor: '#060E17',
                height: STATUS_BAR_HEIGHT,
			},
			section: {
                backgroundColor: '#060E17',
                minHeight: '100%',
                flex: 1,
			},
			logo: {
                alignSelf: 'center',
                transform: [
                	{ scale: 0.7 },
                ],
                marginTop: hp('8%'),
			},
			inputContainer: {
				flexDirection: 'row',
				alignSelf: 'center',
				marginTop: hp('5%'),
				width: wp('75%'),
			},
			inputBox: {
				alignSelf: 'center',
				borderBottomColor: 'white',
				paddingBottom: 5,
				fontFamily: 'Armegoe',
				fontSize: 18,
				color: 'white',
			},
			button: {
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                paddingTop: 13,
                paddingBottom: 13,
                width: wp('75%'),
                borderRadius: 35,
                position: 'relative',
                marginTop: hp('7%'),
                marginBottom: 15,
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
            },
            textButton: {
                textAlign: 'center',
                color: '#FFBA00',
                fontFamily: 'Armegoe',
                fontSize: 20,
                marginVertical: 10,
            },
		});

		const { statusBar, section, logo, inputContainer, inputBox, button, buttonText, textButton } = styles;
		const { iconType, secured, error, pin } = this.state;
        const { navigation } = this.props;
		return (
            <>
				<View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View>
						<Image source = {require('../assets/images/Logo.png')} style = {logo}/>
						<View style = {inputContainer}>
							<Input inputStyle = {inputBox} secureTextEntry = {secured} inputContainerStyle = {{borderBottomWidth: 2, borderBottomColor: 'white'}} value = {pin} onChangeText = {this.handlePin} placeholder = "Enter pin" placeholderTextColor = "white" keyboardAppearance = 'dark' keyboardType = "numeric" errorMessage = {error} rightIcon = {
								<Icon type = "font-awesome" name = {iconType} color = "#fff" onPress = {this.handleSecuredEntry} underlayColor = "transparent"/>
							}/>
						</View>
						<TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.handlePinSubmit}>
                            <Text style = {buttonText}>Login</Text>
                        </TouchableOpacity>
                        <Text style = {textButton} onPress = {() => navigation.navigate('CreatePin')}>Create New Wallet</Text>
                        <Text style = {textButton} onPress = {() => navigation.navigate('ImportWallet')}>Restore Wallet</Text>
					</View>
				</View>
            </>
        );
    }
}
