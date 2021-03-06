/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Icon, Input } from 'react-native-elements';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
export default class ConfirmPin extends Component {

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

    handlePinSubmit = () => {
		let confirmPin  = this.state.pin;
		const {pin} = this.props.route.params;
		if (pin === confirmPin) {
			this.setState({ error: '' }, () => this.props.navigation.navigate('CreateWallet'));
		} else {
			this.setState({ error: 'Enter the same pin you entered before to continue' });
		}
	}

	handleBack = () => {
		const options = {
			enableVibrateFallback: true,
			ignoreAndroidSystemSettings: false,
		};
		ReactNativeHapticFeedback.trigger('impactLight', options);
		this.props.navigation.goBack();
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
				marginLeft: wp('24.5%'),
				marginTop: hp('0.5%'),
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
                marginTop: hp('17%'),
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
            },
		});

		const { statusBar, header, section, icon, title, logo, inputContainer, inputBox, button, buttonText } = styles;
		const { navigation } = this.props;
        const { iconType, secured, error, pin } = this.state;

		return (
            <>
				<View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
                <View style = {section}>
                    <View style = {header}>
                        <Icon type = "font-awesome" name = "angle-left" color = "#fff" size = {wp('15%')} iconStyle = {icon} onPress = {this.handleBack} underlayColor = "transparent" />
                        <Text style = {title}>Confirm Pin</Text>
                    </View>
                    <View>
                        <Image source = {require('../assets/images/Logo.png')} style = {logo}/>
                        <View style = {inputContainer}>
                            <Input inputStyle = {inputBox} secureTextEntry = {secured} inputContainerStyle = {{borderBottomWidth: 2, borderBottomColor: 'white'}} value = {pin} onChangeText = {this.handlePin} placeholder = "Confirm new pin" placeholderTextColor = "white" returnKeyType = "next" keyboardType = "numeric" errorMessage = {error} rightIcon = {
                                <Icon type = "font-awesome" name = {iconType} color = "#fff" onPress = {this.handleSecuredEntry} underlayColor = "transparent"/>
                            }/>
                        </View>
                        <TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.handlePinSubmit}>
                            <Text style = {buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
}
