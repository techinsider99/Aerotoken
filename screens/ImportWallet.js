/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class ImportWallet extends Component {

	constructor() {
		super();
		this.state = {
			phrase: '',
		};
	}

	handlePhrase = phrase => this.setState({ phrase: phrase })

	handlePhraseSubmit = () => {
		let phrase  = this.state.phrase;
		if (phrase) {
			this.setState({ error: '' }, () => this.props.navigation.navigate('Dashboard'));
		} else {
			this.setState({ error: 'Enter a pin to continue' });
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
                marginTop: hp('15%'),
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
        const { phrase } = this.state;
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
						<TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.handlePhraseSubmit}>
                            <Text style = {buttonText}>Import Wallet</Text>
                        </TouchableOpacity>
					</View>
				</View>
            </>
        );
    }
}
