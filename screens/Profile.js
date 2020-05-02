/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

export default class Profile extends Component {

    constructor(){
        super();
        this.state = {
            ethAddress: '',
            ethPrivate: '',
            ethPhrase: '',
            btcAddress: '',
            btcPrivate: '',
            btcPublic: '',
            btcPhrase: '',
        };
    }

    async componentWillMount() {
        const eth = await AsyncStorage.getItem('ethWallet');
        let ethWallet = JSON.parse(eth);
        const btc = await AsyncStorage.getItem('btcWallet');
        let btcWallet = JSON.parse(btc);
        this.setState({
            ethAddress: ethWallet.ethAddress,
            ethPrivate: ethWallet.ethPrivateKey,
            ethPhrase: ethWallet.ethMnemonic,
            btcAddress: btcWallet.btcAddress,
            btcPrivate: btcWallet.btcPrivateKey,
            btcPublic: btcWallet.btcPublicKey,
            btcPhrase: btcWallet.btcWIF,
        });
        console.log(btcWallet)
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
            detailContainer: {
                position: 'relative',
                backgroundColor: '#272a3d',
                marginVertical: hp('1%'),
                padding: wp('5%'),
                borderRadius: 15,
            },
            mainText: {
                fontFamily: 'Armegoe',
                color: 'white',
                fontSize: 18,
                marginBottom: 10,
            },
            grayText: {
                fontFamily: 'Armegoe',
                color: '#8E8C8C',
                fontSize: 18,
            },
            yellowText: {
                fontFamily: 'Armegoe',
                color: '#FFBA00',
                fontSize: 20,
                marginLeft: wp('5%'),
                marginBottom: hp('1%'),
                marginTop: hp('3%')
            },
		});

		const { statusBar, section, header, icon, title, detailContainer, mainText, grayText, yellowText } = styles;
        const { navigation } = this.props;
        
        return (
            <>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
						<Icon type = "feather" name = "bar-chart" color = "#fff" size = {wp('9.5%')} iconStyle = {icon} onPress = {() => navigation.openDrawer()} underlayColor = "transparent" />
						<Text style = {title}>Profile</Text>
					</View>
                    <View style = {{paddingHorizontal: wp('10%'), paddingVertical: hp('2%')}}>
                        <ScrollView contentContainerStyle = {{paddingBottom: 70}}>                        
                        <Text style = {yellowText}>Ethereum</Text>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {mainText}>
                                    Address
                                </Text>
                            </View>
                            <Input inputStyle = {grayText} multiline = {true} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} editable = {false} value = {this.state.ethAddress}/>
                        </View>
                        <View style = {detailContainer}>
                            <Text style = {mainText}>
                                Private key
                            </Text>
                            <Text style = {grayText}>
                                {this.state.ethPrivate}
                            </Text>
                        </View>
                        <View style = {detailContainer}>
                            <Text style = {mainText}>
                                Mnemonic
                            </Text>
                            <Text style = {grayText}>
                                {this.state.ethPhrase}
                            </Text>
                        </View>
                        <Text style = {yellowText}>Bitcoin</Text>
                        <View style = {detailContainer}>
                            <Text style = {mainText}>
                                Address
                            </Text>
                            <Text style = {grayText}>
                                {this.state.btcAddress}
                            </Text>
                        </View>
                        <View style = {detailContainer}>
                            <Text style = {mainText}>
                                Private Key
                            </Text>
                            <Text style = {grayText}>
                                {this.state.btcPrivate}
                            </Text>
                        </View>
                        <View style = {detailContainer}>
                            <Text style = {mainText}>
                                Public Key
                            </Text>
                            <Text style = {grayText}>
                                {this.state.btcPublic}
                            </Text>
                        </View>
                        <View style = {detailContainer}>
                            <Text style = {mainText}>
                                Mnemonic
                            </Text>
                            <Text style = {grayText}>
                                {this.state.btcPhrase}
                            </Text>
                        </View>
                        </ScrollView>
                    </View>
                </View>
            </>
        );
    }
}
