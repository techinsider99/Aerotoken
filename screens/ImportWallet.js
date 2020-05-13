/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, ActivityIndicator, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';
import '../shim.js';
import crypto from 'crypto';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-community/async-storage';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
export default class ImportWallet extends Component {

	constructor() {
		super();
		this.state = {
			phrase: '',
			secured: true,
			iconType: 'eye',
			pin:'',
			phraseError: '',
			pinError: '',
			loading: false,
		};
	}

	UNSAFE_componentWillMount(){
			fetch('https://api-aet.herokuapp.com/create')
			.then((response) => response.json())
			.then((responseJson) => {
				const btcwalletJson = {
					'btcAddress' : responseJson.btcAddress,
					'btcPrivateKey' : responseJson.btcPrivateKey,
					'btcPublicKey' :responseJson.btcPublicKey,
					'btcWIF' : responseJson.btcwif,
				};
				const btcwallet = JSON.stringify(btcwalletJson);
				try {
					AsyncStorage.setItem('btcWallet', btcwallet);
				}
				catch {
					Alert("Cannot Create");
				}})
			.catch(err=>{
				Alert(err);
			});
	}

	handlePin = pin => this.setState({ pin: pin })

	handlePhrase = phrase => this.setState({ phrase: phrase })

	handleSecuredEntry = () => {
		let icon = this.state.iconType;
		if (icon === 'eye') {
			this.setState({ 
				iconType: 'eye-slash',
				secured: false,
			});
		} else {
			this.setState({
				iconType: 'eye',
				secured: true,
			});
		}
	}

	encrypt = data => {
        const key = '8tAGG7bur1V4qpy6LN5E5Fy2bUAD9loo';
        const iv = 't8iMMFqZroPuNn7N';
        let encipher = crypto.createCipheriv('aes-256-cbc', key, iv),
          buffer = Buffer.concat([
            encipher.update(data),
            encipher.final(),
          ]);
        return buffer.toString('base64');
    }

	handlePhraseSubmit = () => {
		let phrase  = this.state.phrase;
		phrase = this.encrypt(phrase);
		let pin = this.state.pin;
		const data = {
			phrase: phrase,
		};
		if (phrase) {
			if (pin) {
				this.setState({
					phraseError: '',
					pinError: '',
					loading: true,
				}, () => {
					axios.post('https://aet-wallet.herokuapp.com/api/v1/import', data)
					.then(res => {
						const walletData = res.data;
						try {
							const walletJson = {
								'ethAddress' : walletData.ethAddress,
								'ethPrivateKey' : walletData.ethPrivateKey,
								'ethMnemonic' : walletData.ethMnemonic,
							};
							const wallet = JSON.stringify(walletJson);
							AsyncStorage.setItem('ethWallet', wallet);
							AsyncStorage.setItem('@pin', pin);
							this.props.navigation.popToTop();
							this.props.navigation.replace('Dashboard');
						}
						catch (error){
							this.setState({ loading: false });
							Alert.alert('Error', error);
						}
					}).catch(err => {
						this.setState({ loading: false });
						Alert.alert('Error', err);
					});
				});
			} else {
				this.setState({
					phraseError: '',
					pinError: 'Enter your new pin to continue',
				});
			}
		} else {
			if (this.state.pinError) {
				this.setState({
					pinError: '',
					phraseError: 'Enter the backup phrase to continue',
				});
			} else {
				this.setState({
					phraseError: 'Enter the backup phrase to continue',
				});
			}
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
			loadingSection: {
				backgroundColor: '#060E17',
                minHeight: '100%',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			},
			logo: {
                alignSelf: 'center',
                transform: [
                	{ scale: 0.7 },
                ],
                marginTop: hp('1%'),
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
				fontSize: 15,
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
                marginTop: hp('17%'),
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
			},
            yellowText: {
                fontFamily: 'Armegoe',
                color: '#FFBA00',
                fontSize: 16,
			},
			errorText: {
				fontFamily: 'Armegoe',
			}
		});

        const { statusBar, section, loadingSection, logo, inputContainer, inputBox, button, buttonText, yellowText, errorText } = styles;
        const { phrase, secured, pin, iconType, loading: isLoading, phraseError, pinError } = this.state;
		return (
            <>
				<View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				{
					isLoading ?

					<View style = {loadingSection}>
						<ActivityIndicator size = {40} color = "#FFBA00" style = {{marginBottom: hp('2%')}}/>
						<Text style = {yellowText}>Importing your wallet</Text>
					</View>

					:

					<View style = {section}>
						<View>
							<Image source = {require('../assets/images/Logo.png')} style = {logo}/>
							<View style = {inputContainer}>
								<Input inputStyle = {inputBox} inputContainerStyle = {{borderBottomWidth: 1, borderBottomColor: 'white'}} value = {phrase} onChangeText = {this.handlePhrase} placeholder = "Type in 12-word backup Phrase" placeholderTextColor = "white" keyboardAppearance = "dark" rightIcon = {
									<Icon type = "font-awesome" name = "qrcode" color = "#fff" underlayColor = "transparent"/>
								} errorMessage = {phraseError} errorStyle = {errorText}/>
							</View>
							<View style = {inputContainer}>
								<Input inputStyle = {inputBox} secureTextEntry = {secured} inputContainerStyle = {{borderBottomWidth: 2, borderBottomColor: 'white'}} value = {pin} onChangeText = {this.handlePin} placeholder = "Confirm new pin" placeholderTextColor = "white" returnKeyType = "next" keyboardType = "numeric"rightIcon = {
									<Icon type = "font-awesome" name = {iconType} color = "#fff" onPress = {this.handleSecuredEntry} underlayColor = "transparent"/>
								} errorMessage = {pinError} errorStyle = {errorText}/>
							</View>
							<TouchableOpacity style = {button} activeOpacity = {0.8} onPress = {this.handlePhraseSubmit} disabled = {isLoading}>
								<Text style = {buttonText}>Import Wallet</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
            </>
        );
    }
}
