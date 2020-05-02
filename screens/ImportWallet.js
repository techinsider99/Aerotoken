/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, ActivityIndicator, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';
import { ethers } from 'ethers';
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
			error:'',
			loading: false
		};
	}

	UNSAFE_componentWillMount(){
			fetch('https://api-aet.herokuapp.com/create')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ loading: false });
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
				this.setState({ loading: false });
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

	handlePhraseSubmit = () => {
		let phrase  = this.state.phrase;
		let pin = this.state.pin;
		this.setState({ loading: true }, async () => {
			try{
				let walletTemp = ethers.Wallet.fromMnemonic(phrase);
				const walletJson = {
					'ethAddress' : walletTemp.address,
					'ethPrivateKey' : walletTemp.privateKey,
					'ethMnemonic' : walletTemp.mnemonic
				}
				const wallet = JSON.stringify(walletJson);
				AsyncStorage.setItem('ethWallet', wallet);
				await AsyncStorage.setItem('@pin', pin, () => this.setState({ loading: false }));
				this.props.navigation.replace('Dashboard');
			}
			catch(error){
				this.setState({ loading: false })
				Alert(error);
			}
		})
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
		});

        const { statusBar, section, logo, inputContainer, inputBox, button, buttonText } = styles;
        const { phrase,secured,pin,error,iconType, loading: isLoading } = this.state;
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
							<Input inputStyle = {inputBox} inputContainerStyle = {{borderBottomWidth: 1, borderBottomColor: 'white'}} value = {phrase} onChangeText = {this.handlePhrase} placeholder = "Type in 12-word backup Phrase" placeholderTextColor = "white" keyboardAppearance = "dark" rightIcon = {
								<Icon type = "font-awesome" name = "qrcode" color = "#fff" underlayColor = "transparent"/>
							}/>
						</View>
						<View style = {inputContainer}>
                            <Input inputStyle = {inputBox} secureTextEntry = {secured} inputContainerStyle = {{borderBottomWidth: 2, borderBottomColor: 'white'}} value = {pin} onChangeText = {this.handlePin} placeholder = "Confirm new pin" placeholderTextColor = "white" returnKeyType = "next" keyboardType = "numeric" errorMessage = {error} rightIcon = {
                                <Icon type = "font-awesome" name = {iconType} color = "#fff" onPress = {this.handleSecuredEntry} underlayColor = "transparent"/>
                            }/>
						</View>
						<TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.handlePhraseSubmit} disabled = {isLoading}>
							{
								isLoading ?

								<ActivityIndicator size = {24} color = "#fff" />

								:

								<Text style = {buttonText}>Import Wallet</Text>
							}
                        </TouchableOpacity>
					</View>
				</View>
            </>
        );
    }
}
