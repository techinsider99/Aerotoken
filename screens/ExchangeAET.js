/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, TextInput } from 'react-native';
import { Picker } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class ExchangeAET extends Component {
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
			buttonContainer: {
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			},
            mainContainer: {
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
            },
            innerContainer: {
                flex: 1,
                flexDirection: 'row',
                marginTop: hp('10%'),
                alignSelf: 'center',
                marginBottom: hp('16%'),
            },
            innerContainer1: {
                flex: 1,
                flexDirection: 'row',
                marginTop: hp('9.5%'),
                alignSelf: 'center',
                marginBottom: hp('9%'),
            },
            inputBox: {
                backgroundColor: '#32374f',
                height: 57,
                width: wp('60%'),
                borderRadius: 10,
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                paddingVertical: 15,
                paddingHorizontal: 20,
            },
            picker: {
                height: 57,
                maxWidth: 100,
                backgroundColor: '#32374f',
                borderRadius: 0,
                marginLeft: 10,
                color: 'white',
            },
            downIcon: {
                alignSelf: 'center',
                position: 'relative',
                top: hp('3.5%',),
                right: wp('8'),
            },
            exchangeButton: {
                backgroundColor: '#32374f',
                padding: 20,
                borderRadius: 50,
                alignSelf: 'center',
            },
            exchangeIcon: {
                transform: [
                    { scale: 1.4 },
                    { rotate: '90deg' },
                ],
            },
            infoContainer: {
                backgroundColor: '#32374f',
                position: 'relative',
                paddingVertical: 20,
                paddingHorizontal: 15,
                marginHorizontal: wp('5%'),
                marginVertical: 2,
                borderRadius: 10,
            },
            balanceHeading: {
                fontFamily: 'Armegoe',
                color: '#8E8C8C',
                fontSize: 18,
            },
            logo: {
                width: 35,
                height: 42,
                marginHorizontal: 10,
            },
            button: {
				position: 'relative',
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 13,
                width: wp('75%'),
                borderRadius: 15,
                marginHorizontal: wp('5%'),
                flexDirection: 'row',
                marginTop: hp('20%'),
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 18,
                textAlign: 'center',
            },
		});

		const { statusBar, section, header, icon, title, innerContainer, innerContainer1, inputBox, picker, downIcon, exchangeButton, exchangeIcon, button, buttonText } = styles;
		const { navigation } = this.props;

        return (
            <>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
                        <Icon type = "font-awesome" name = "angle-left" color = "#fff" size = {wp('12%')} iconStyle = {icon} onPress = {() => navigation.goBack()} underlayColor = "transparent" />
                        <Text style = {title}>Exchange AET</Text>
					</View>
					<View>
                        <View style = {innerContainer}>
                            <TextInput onChangeText = {this.handleInput1} style = {inputBox}/>
                            <Picker selectedValue = "AET" style = {picker}>
                                <Picker.Item label = "AET"/>
                                <Picker.Item label = "BTC"/>
                            </Picker>
                            <Icon type = "feather" name = "chevron-down" color = "white" iconStyle = {downIcon}/>
                        </View>
                        <View style = {exchangeButton}>
                            <Icon type = "font-awesome" name = "exchange" color = "white" iconStyle = {exchangeIcon}/>
                        </View>
                        <View style = {innerContainer1}>
                            <TextInput onChangeText = {this.handleInput1} style = {inputBox}/>
                            <Picker mode = "dialog" style = {picker} selectedValue = "AET">
                                <Picker.Item label = "USD"/>
                                <Picker.Item label = "EUR"/>
                                <Picker.Item label = "Perfect Money"/>
                                <Picker.Item label = "Paypal"/>
                                <Picker.Item label = "Solid Pay Trust"/>
                                <Picker.Item label = "Skrill"/>
                                <Picker.Item label = "Cards (MasterCard, Visa, etc)"/>
                                <Picker.Item label = "WebMoney"/>
                                <Picker.Item label = "Payeer"/>
                            </Picker>
                            <Icon type = "feather" name = "chevron-down" color = "white" iconStyle = {downIcon}/>
                        </View>
                	</View>
                    <View>
                        <TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.handlePhraseSubmit}>
                            <Text style = {buttonText}>Exchange</Text>
                        </TouchableOpacity>
                    </View>
				</View>
            </>
        );
    }
}
