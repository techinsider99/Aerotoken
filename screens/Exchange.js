/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, StatusBar, Platform, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class Exchange extends Component {

	handleFiat = () => {
		Alert.alert('Exchange with Fiat','Coming soon!');
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
				marginLeft: wp('5%'),
                padding: 5,
                transform: [
                    { rotate: '-90deg' },
                    { rotateX: '180deg' },
                ],
			},
			title: {
				color: 'white',
				fontFamily: 'Armegoe',
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				marginLeft: wp('13%'),
			},
			buttonContainer: {
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			},
			button: {
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                paddingTop: 13,
                paddingBottom: 13,
                width: wp('75%'),
                borderRadius: 15,
				position: 'relative',
				marginBottom: 40,
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
            },
		});

		const { statusBar, section, header, icon, title, buttonContainer, button, buttonText } = styles;
		const { navigation } = this.props;

        return (
            <>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
						<Icon type = "feather" name = "bar-chart" color = "#fff" size = {wp('9.5%')} iconStyle = {icon} onPress = {() => navigation.openDrawer()} underlayColor = "transparent" />
						<Text style = {title}>Exchange Crypto</Text>
					</View>
					<View style = {buttonContainer}>
						<TouchableOpacity style = {button} onPress = {() => navigation.navigate('ExchangeCoins')} activeOpacity = {0.8}>
							<Text style = {buttonText}>Exchange AET with coins</Text>
						</TouchableOpacity>
						<TouchableOpacity style = {button} onPress = {this.handleFiat} activeOpacity = {0.8}>
							<Text style = {buttonText}>Exchange AET with Fiat</Text>
						</TouchableOpacity>
					</View>
				</View>
            </>
        );
    }
}
