/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class CreateWallet extends Component {

	handlePress = () => {
		const options = {
			enableVibrateFallback: true,
			ignoreAndroidSystemSettings: false,
		};
		ReactNativeHapticFeedback.trigger('impactLight', options);
	}

	resetAction = () => {
		this.props.navigation.popToTop();
		this.props.navigation.replace('Dashboard');
	}

    render() {
		const styles = StyleSheet.create({
			statusBar: {
                width: '100%',
                backgroundColor: '#060E17',
                height: STATUS_BAR_HEIGHT,
			},
			header: {
				flexDirection: 'row',
			},
			section: {
                backgroundColor: '#060E17',
                minHeight: '100%',
                flex: 1,
			},
			icon: {
				marginLeft: wp('5%'),
				padding: 5,
			},
			title: {
				color: 'white',
				fontFamily: 'Armegoe',
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				marginLeft: wp('16.5%'),
				marginTop: hp('0.5%'),
			},
			logo: {
				alignSelf: 'center',
                transform: [
                	{ scale: 0.5 },
                ],
                marginTop: hp('0%'),
			},
			textContainer: {
				alignContent: 'center',
				marginLeft: wp('9.5%'),
				marginRight: wp('9.5%'),
				marginTop: hp('-5%'),
			},
			mainText: {
				color: 'white',
				fontFamily: 'Armegoe',
				alignSelf: 'center',
				fontSize: 17,
			},
			subText: {
				color: '#8E8C8C',
				fontFamily: 'Armegoe',
				alignSelf: 'center',
				fontSize: 15,
				marginTop: 10,
			},
			textButton: {
				color: '#FFBA00',
				alignSelf: 'center',
				fontSize: 17,
				marginLeft: 10,
			},
			copyTextContainer: {
				flex: 1,
				flexDirection: 'row',
				alignSelf: 'center',
				marginTop: 80,
			},
			button: {
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                paddingTop: 13,
                paddingBottom: 13,
                width: wp('75%'),
                borderRadius: 35,
                position: 'relative',
                marginTop: hp('4%'),
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
            },
		});

		const { statusBar, header, section, icon, title, logo, textContainer, mainText, subText, textButton, copyTextContainer, button, buttonText } = styles;
		const { navigation } = this.props;
        return (
            <>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
                        <Icon type = "font-awesome" name = "angle-left" color = "#fff" size = {wp('12%')} iconStyle = {icon} onPress = {() => navigation.goBack()} underlayColor = "transparent" />
                        <Text style = {title}>Create New Wallet</Text>
                    </View>
					<Image source = {require('../assets/images/ScanScreen.png')} style = {logo}/>
					<View style = {textContainer}>
						<Text style = {mainText}>
							Demo application aero token inflationary aviation industry exchange shop radical revolutionary token
						</Text>
						<Text style = {subText}>
							Please copy the 12-word Backup Phrase and save in a secure place so that it can be used to restore your wallet at anytime
						</Text>
						<View style = {copyTextContainer}>
							<Icon type = "feather" name = "copy" color = "#FFBA00" underlayColor = "transparent" onPress = {this.handlePress}/>
							<Text style = {textButton} onPress = {this.handlePress}>
								Copy To Clipboard
							</Text>
						</View>
						<TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.resetAction}>
                            <Text style = {buttonText}>Start Aerotoken</Text>
                        </TouchableOpacity>
					</View>
				</View>
            </>
        );
    }
}
