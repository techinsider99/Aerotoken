/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class Send extends Component {
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
                marginLeft: wp('-15%'),
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
                marginTop: hp('20%'),
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
                fontSize: 18,
            },
            logo: {
                width: wp('9%'),
                height: hp('5.5%'),
                alignSelf: 'center',
                transform: [
                    { scale: 1.5 },
                ],
                marginTop: hp('8%'),
            },
            container: {
                marginHorizontal: 55,
                marginVertical: 70,
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

		const { statusBar, section, header, icon, title, button, buttonText, mainText, logo, container, inputBox, borderedLabel, label } = styles;
		const { navigation } = this.props;
		const { currencyName, abr, avatar } = this.props.route.params;
        return (
            <>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
						<TouchableOpacity onPress = {() => navigation.goBack()} activeOpacity = {0.9}>
							<Icon type = "font-awesome" name = "angle-left" color = "#fff" size = {wp('12%')} iconStyle = {icon}  underlayColor = "transparent" />
						</TouchableOpacity>
						<Text style = {title}>Send {currencyName}({abr})</Text>
					</View>
					<View>
                        <Image source = {avatar} style = {logo}/>
                    </View>
                    <View style = {container} >
                        <Input inputStyle = {inputBox} inputContainerStyle = {{borderBottomWidth: 1, borderBottomColor: '#7A7A7C'}}  onChangeText = {this.handlePhrase} placeholder = {`Tap to paste ${abr} address`} placeholderTextColor = "white" keyboardAppearance = "dark" rightIcon = {
							<Icon type = "font-awesome" name = "qrcode" color = "#7A7A7C" underlayColor = "transparent"/>
						}/>
                        <View style = {borderedLabel}>
                            <View style = {{flex: 1}}>
                                <Text style = {mainText}>0.00</Text>
                            </View>
                            <View>
                                <Text style = {mainText}>{abr}</Text>
                            </View>
                        </View>
                        <View style = {label}>
                            <View style = {{flex: 1}}>
                                <Text style = {mainText}>0</Text>
                            </View>
                            <View>
                                <Text style = {mainText}>USD</Text>
                            </View>
                        </View>
                    </View>
                    <KeyboardAvoidingView enabled = {false}>
                        <TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.handlePhraseSubmit}>
                            <Icon type = "feather" name = "arrow-up-right" color = "white" />
                            <Text style = {buttonText}>Send</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
				</View>
            </>
        );
    }
}
