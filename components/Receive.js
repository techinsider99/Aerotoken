/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, KeyboardAvoidingView, Share, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Icon, Input } from 'react-native-elements';
import QRCode from 'react-qr-code';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class Receive extends Component {

    handleBack = () => {
		const options = {
			enableVibrateFallback: true,
			ignoreAndroidSystemSettings: false,
		};
		ReactNativeHapticFeedback.trigger('impactLight', options);
		this.props.navigation.goBack();
    }

    handleShare = async (abr, address) => {
        try {
            await Share.share({
              message: `My ${abr} address: ${address}`,
            });
        } catch (error) {
            Alert(error.message);
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
			header: {
				flexDirection: 'row',
				marginTop: -10,
			},
			icon: {
                flexGrow: 1,
                position: 'relative',
                paddingHorizontal: wp('6%'),
			},
			title: {
				color: 'white',
				fontFamily: 'Armegoe',
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
                flexGrow: 5,
                marginLeft: wp('-15.5%'),
            },
			button: {
				position: 'relative',
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 13,
                width: wp('75%'),
                borderRadius: 25,
                marginHorizontal: wp('5%'),
                flexDirection: 'row',
                marginTop: hp('10%'),
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 18,
                textAlign: 'center',
            },
            mainText: {
                fontFamily: 'Armegoe',
                color: 'white',
                fontSize: 19,
                textAlign: 'center',
                marginBottom: 15,
            },
            yellowText: {
                fontFamily: 'Armegoe',
                color: '#FFBA00',
                fontSize: 19,
                textAlign: 'center',
            },
            logo: {
                alignSelf: 'center',
                transform: [
                	{ scale: 0.5 },
                ],
            },
            container: {
                marginHorizontal: 55,
                marginVertical: 20,
            },
            inputBox: {
				alignSelf: 'center',
				borderBottomColor: 'white',
				paddingBottom: 5,
				fontFamily: 'Armegoe',
				fontSize: 15,
				color: 'white',
            },
            borderedLabel: {
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 50,
                paddingBottom: 10,
                borderBottomColor: '#7A7A7C',
                borderBottomWidth: 1,
            },
            label: {
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
            },
		});

		const { statusBar, section, header, icon, title, button, buttonText, mainText, yellowText, logo, container } = styles;
		const { currencyName, abr, address} = this.props.route.params;
        return (
            <>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
						<TouchableOpacity onPress = {this.handleBack} activeOpacity = {0.9}>
							<Icon type = "font-awesome" name = "angle-left" color = "#fff" size = {wp('15%')} iconStyle = {icon}  underlayColor = "transparent" />
						</TouchableOpacity>
						<Text style = {title}>Receive {currencyName}({abr})</Text>
					</View>
					<View style={{alignSelf:'center', marginVertical:70}}>
						<QRCode 
						value={address} 
						size={180}
						bgColor="#000"
						fgColor="#fff"
						/>
					</View>
                    <View style = {container} >
                        <Text style = {mainText}>Your {abr} address</Text>
                        <Text style = {yellowText}>{address}</Text>
                    </View>
                    <KeyboardAvoidingView enabled = {false}>
                        <TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {() => this.handleShare(abr, address)}>
                            <Icon type = "feather" name = "share-2" color = "white" iconStyle = {{marginRight: 5}}/>
                            <Text style = {buttonText}>Share</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
				</View>
            </>
        );
    }
}
