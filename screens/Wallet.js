/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import Currency from '../components/Currency';
import Aerotoken from '../assets/images/Logo.png';
import Bitcoin from '../assets/images/Bitcoin.png';
import Ethereum from '../assets/images/Ethereum.png';
import Ripple from '../assets/images/Ripple.png';
import Litecoin from '../assets/images/Litecoin.png';
import Dogecoin from '../assets/images/Dogecoin.png';
import USDT from '../assets/images/USDT.png';
import TRX from '../assets/images/TRX.png';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

export default class Dashboard extends Component {

	navigateScreen = (route, currencyName, price, currencyValue, avatar) => {
		this.props.navigation.navigate(route, {
			currencyName: currencyName,
			price: price,
			currencyValue: currencyValue,
			avatar: avatar,
		});
	}

    render() {
		const styles = StyleSheet.create({
			statusBar: {
                width: '100%',
                backgroundColor: '#070E18',
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
				marginLeft: wp('25%'),
            },
            mainContainer: {
                paddingTop: hp('5%'),
            },
		});

		const { statusBar, section, header, icon, title, mainContainer } = styles;
		const { navigation } = this.props;

        return (
            <>
				<View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
						<Icon type = "feather" name = "bar-chart" color = "#fff" size = {wp('9.5%')} iconStyle = {icon} onPress = {() => navigation.openDrawer()} underlayColor = "transparent" />
						<Text style = {title}>Wallet</Text>
					</View>
                    <View >
                        <ScrollView contentContainerStyle = {{paddingBottom: 120, marginTop: 50}}>
                            <Currency navigateTo = {this.navigateScreen} avatar = {Aerotoken} currencyName = "Aerotoken" currencyValue = {7.5662} price = "$8000" difference = "+3.12%" />
                            <Currency navigateTo = {this.navigateScreen} avatar = {Bitcoin} currencyName = "Bitcoin" currencyValue = {0.3265} price = "$3234" difference = "-3.12"/>
                            <Currency navigateTo = {this.navigateScreen} avatar = {Ethereum} currencyName = "Ethereum" currencyValue = {0.3262} price = "$682" difference = "+10.12" />
                            <Currency navigateTo = {this.navigateScreen} avatar = {Ripple} currencyName = "Ripple" currencyValue = {5.3286} price = "$2742" difference = "-3.39"/>
                            <Currency navigateTo = {this.navigateScreen} avatar = {Litecoin} currencyName = "LiteCoin" currencyValue = {3.5662} price = "$1064" difference = "+13.12"/>
                            <Currency navigateTo = {this.navigateScreen} avatar = {Dogecoin} currencyName = "Doge" currencyValue = {1.762} price = "$3234" difference = "-3.12"/>
                            <Currency navigateTo = {this.navigateScreen} avatar = {USDT} currencyName = "USDT" currencyValue = {1.762} price = "$3234" difference = "-3.12"/>
                            <Currency navigateTo = {this.navigateScreen} avatar = {TRX} currencyName = "TetherCoin(TRX)" currencyValue = {1.762} price = "$3234" difference = "-3.12"/>
                        </ScrollView>
                    </View>
				</View>
            </>
        );
    }
}
