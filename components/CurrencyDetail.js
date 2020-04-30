/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, ScrollView } from 'react-native';
import { Picker } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class CurrencyDetail extends Component {
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
            buttonContainer: {
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
			button: {
				position: 'relative',
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 13,
                width: wp('35%'),
                borderRadius: 25,
                marginHorizontal: wp('5%'),
                flexDirection: 'row',
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 18,
                textAlign: 'center',
            },
            balanceContainer: {
                position: 'relative',
                backgroundColor: '#272a3d',
                marginHorizontal: wp('5%'),
                marginVertical: hp('6%'),
                padding: wp('5%'),
                borderRadius: 15,
            },
            historyContainer: {
                position: 'relative',
                backgroundColor: '#272a3d',
                marginHorizontal: wp('5%'),
                marginVertical: hp('1%'),
                padding: wp('5%'),
                borderRadius: 15,
            },
            mainText: {
                fontFamily: 'Armegoe',
                color: 'white',
                fontSize: 18,
            },
            priceText: {
                fontFamily: 'Armegoe',
                color: 'white',
                fontSize: 38,
            },
            grayText: {
                fontFamily: 'Armegoe',
                color: '#8E8C8C',
                fontSize: 18,
            },
            yellowText: {
                fontFamily: 'Armegoe',
                color: '#FFBA00',
                fontSize: 17,
            },
            greenText: {
                fontFamily: 'Armegoe',
                color: '#2CC593',
                fontSize: 18,
            },
            logo: {
                width: wp('9%'),
                height: hp('5.5%'),
            },
            refreshIcon: {
                transform: [
                    { rotate: '90deg' },
                    { rotateY: '180deg' },
                ],
            },
		});

		const { statusBar, section, header, icon, title, button, buttonText, balanceContainer, historyContainer, mainText, priceText, grayText, logo, buttonContainer, yellowText, refreshIcon, greenText } = styles;
		const { navigation } = this.props;
		const { currencyName, price, currencyValue, avatar } = this.props.route.params;
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
						<Text style = {title}>{currencyName}</Text>
					</View>
					<ScrollView contentContainerStyle = {{paddingBottom: 60}}>
						<View style = {balanceContainer}>
							<View style = {{flexDirection: 'row', marginBottom: hp('4%')}}>
								<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
									<Text style = {mainText}>Current balance</Text>
									<Text style = {priceText}>{price}</Text>
								</View>
								<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row'}}>
									<Text style = {mainText}>USD</Text>
								</View>
							</View>
							<View style = {{flexDirection: 'row'}}>
								<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end'}}>
									<Text style = {grayText}>{currencyValue}</Text>
								</View>
								<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row'}}>
									<Image source = {avatar} style = {logo}/>
								</View>
							</View>
						</View>
						<View style = {buttonContainer}>
							<TouchableOpacity style = {button} activeOpacity = {0.9}>
								<Icon type = "feather" name = "arrow-up-right" color = "white" />
								<Text style = {buttonText}>Send</Text>
							</TouchableOpacity>
							<TouchableOpacity style = {button} activeOpacity = {0.9}>
								<Icon type = "feather" name = "arrow-down-left" color = "white" />
								<Text style = {buttonText}>Receive</Text>
							</TouchableOpacity>
						</View>
						<View style = {balanceContainer}>
							<Text style = {mainText}>Your AET address</Text>
							<View style = {{flexDirection: 'row', marginTop: hp('1.5%'), flexWrap: 'wrap'}}>
								<View style = {{flex: 5}}>
									<Text style = {grayText}>33U3KSZ4Ev32MAMydcajChp</Text>
								</View>
								<View style = {{flex: 1, justifyContent: 'flex-end', flexDirection: 'column', alignContent: 'flex-end', alignContent: 'flex-end'}}>
									<Text style = {yellowText}>COPY</Text>
								</View>
							</View>
						</View>
						<View style = {{flexDirection: 'row', marginHorizontal: wp('10%')}}>
							<View style = {{flex: 8}}>
								<Text style = {mainText}>Transaction History</Text>
							</View>
							<View style = {{flex: 1}}>
								<Icon type = "font-awesome-5" name = "sync" color = "#8E8C8C" iconStyle = {refreshIcon}/>
							</View>
						</View>
						<View style = {historyContainer}>
							<View style = {{flexDirection: 'row'}}>
								<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
									<Text style = {mainText}>Sent to 35486214</Text>
								</View>
								<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
									<Text style = {greenText}>+7.5662 BTC</Text>
								</View>
							</View>
						</View>
						<View style = {historyContainer}>
							<View style = {{flexDirection: 'row'}}>
								<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
									<Text style = {mainText}>Received from 21654984</Text>
								</View>
								<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
									<Text style = {yellowText}>-7.5662 BTC</Text>
								</View>
							</View>
						</View>
						<View style = {historyContainer}>
							<View style = {{flexDirection: 'row'}}>
								<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
									<Text style = {mainText}>Sent to 35486214</Text>
								</View>
								<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
									<Text style = {greenText}>+7.5662 BTC</Text>
								</View>
							</View>
						</View>
					</ScrollView>
				</View>
            </>
        );
    }
}
