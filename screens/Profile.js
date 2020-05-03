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
            ethAddressVisible: false,
            ethEye: 'eye-slash',
            ethPrivate: '',
            ethPrivateVisible: false,
            ethPrivateEye: 'eye-slash',
            ethPhrase: '',
            ethPhraseVisible: false,
            ethPhraseEye: 'eye-slash',
            btcAddress: '',
            btcAddressVisible: false,
            btcAddressEye: 'eye-slash',
            btcPrivate: '',
            btcPrivateVisible: false,
            btcPrivateEye: 'eye-slash',
            btcPublic: '',
            btcPublicVisible: false,
            btcPublicEye: 'eye-slash',
            btcPhrase: '',
            btcPhraseVisible: false,
            btcPhraseEye: 'eye-slash',
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
        console.log(btcWallet);
    }

    toggleEth = () => {
        const eth = this.state.ethAddressVisible;
        if (eth === false) {
            this.setState({
                ethAddressVisible: true,
                ethEye: 'eye',
            });
        } else {
            this.setState({
                ethAddressVisible: false,
                ethEye: 'eye-slash',
            });
        }
    }

    toggleEthKey = () => {
        const eth = this.state.ethPrivateVisible;
        if (eth === false) {
            this.setState({
                ethPrivateVisible: true,
                ethPrivateEye: 'eye',
            });
        } else {
            this.setState({
                ethPrivateVisible: false,
                ethPrivateEye: 'eye-slash',
            });
        }
    }

    toggleEthPhrase = () => {
        const eth = this.state.ethPhraseVisible;
        if (eth === false) {
            this.setState({
                ethPhraseVisible: true,
                ethPhraseEye: 'eye',
            });
        } else {
            this.setState({
                ethPhraseVisible: false,
                ethPhraseEye: 'eye-slash',
            });
        }
    }

    toggleBtc = () => {
        const btc = this.state.btcAddressVisible;
        if (btc === false) {
            this.setState({
                btcAddressVisible: true,
                btcAddressEye: 'eye',
            });
        } else {
            this.setState({
                btcAddressVisible: false,
                btcAddressEye: 'eye-slash',
            });
        }
    }

    toggleBtcPrivate = () => {
        const btc = this.state.btcPrivateVisible;
        if (btc === false) {
            this.setState({
                btcPrivateVisible: true,
                btcPrivateEye: 'eye',
            });
        } else {
            this.setState({
                btcPrivateVisible: false,
                btcPrivateEye: 'eye-slash',
            });
        }
    }

    toggleBtcPublic = () => {
        const btc = this.state.btcPublicVisible;
        if (btc === false) {
            this.setState({
                btcPublicVisible: true,
                btcPublicEye: 'eye',
            });
        } else {
            this.setState({
                btcPublicVisible: false,
                btcPublicEye: 'eye-slash',
            });
        }
    }

    toggleBtcPhrase = () => {
        const btc = this.state.btcPhraseVisible;
        if (btc === false) {
            this.setState({
                btcPhraseVisible: true,
                btcPhraseEye: 'eye',
            });
        } else {
            this.setState({
                btcPhraseVisible: false,
                btcPhraseEye: 'eye-slash',
            });
        }
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
        const { ethAddress, ethAddressVisible, ethEye, ethPrivate, ethPrivateVisible, ethPrivateEye, ethPhrase, ethPhraseVisible, ethPhraseEye, btcAddress, btcAddressVisible, btcAddressEye, btcPrivate, btcPrivateVisible, btcPrivateEye, btcPublic, btcPublicVisible, btcPublicEye, btcPhrase, btcPhraseVisible, btcPhraseEye } = this.state;
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
                                <View style = {{flex: 1}}>
                                    <Text style = {mainText}>
                                        Address
                                    </Text>
                                </View>
                                <Icon type = "font-awesome" name = {ethEye} color = "white" onPress = {this.toggleEth} underlayColor = "transparent"/>
                            </View>
                            <Input inputStyle = {grayText} multiline = {ethAddressVisible} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} secureTextEntry = {!ethAddressVisible} editable = {false} value = {ethAddress}/>
                        </View>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1}}>
                                    <Text style = {mainText}>
                                        Private key
                                    </Text>
                                </View>
                                <Icon type = "font-awesome" name = {ethPrivateEye} color = "white" onPress = {this.toggleEthKey} underlayColor = "transparent"/>
                            </View>
                            <Input inputStyle = {grayText} multiline = {ethPrivateVisible} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} secureTextEntry = {!ethPrivateVisible} editable = {false} value = {ethPrivate}/>
                        </View>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1}}>
                                    <Text style = {mainText}>
                                        Mnemonic
                                    </Text>
                                </View>
                                <Icon type = "font-awesome" name = {ethPhraseEye} color = "white" onPress = {this.toggleEthPhrase} underlayColor = "transparent"/>
                            </View>
                            <Input inputStyle = {grayText} multiline = {ethPhraseVisible} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} secureTextEntry = {!ethPhraseVisible} editable = {false} value = {ethPhrase}/>
                        </View>
                        <Text style = {yellowText}>Bitcoin</Text>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1}}>
                                    <Text style = {mainText}>
                                        Address
                                    </Text>
                                </View>
                                <Icon type = "font-awesome" name = {btcAddressEye} color = "white" onPress = {this.toggleBtc} underlayColor = "transparent"/>
                            </View>
                            <Input inputStyle = {grayText} multiline = {btcAddressVisible} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} secureTextEntry = {!btcAddressVisible} editable = {false} value = {btcAddress}/>
                        </View>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1}}>
                                    <Text style = {mainText}>
                                        Private key
                                    </Text>
                                </View>
                                <Icon type = "font-awesome" name = {btcPrivateEye} color = "white" onPress = {this.toggleBtcPrivate} underlayColor = "transparent"/>
                            </View>
                            <Input inputStyle = {grayText} multiline = {btcPrivateVisible} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} secureTextEntry = {!btcPrivateVisible} editable = {false} value = {btcPrivate}/>
                        </View>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1}}>
                                    <Text style = {mainText}>
                                        Public key
                                    </Text>
                                </View>
                                <Icon type = "font-awesome" name = {btcPublicEye} color = "white" onPress = {this.toggleBtcPublic} underlayColor = "transparent"/>
                            </View>
                            <Input inputStyle = {grayText} multiline = {btcPublicVisible} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} secureTextEntry = {!btcPublicVisible} editable = {false} value = {btcPublic}/>
                        </View>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1}}>
                                    <Text style = {mainText}>
                                        WIF
                                    </Text>
                                </View>
                                <Icon type = "font-awesome" name = {btcPhraseEye} color = "white" onPress = {this.toggleBtcPhrase} underlayColor = "transparent"/>
                            </View>
                            <Input inputStyle = {grayText} multiline = {btcPhraseVisible} inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 0, borderBottomColor: 'black' }} secureTextEntry = {!btcPhraseVisible} editable = {false} value = {btcPhrase}/>
                        </View>
                        </ScrollView>
                    </View>
                </View>
            </>
        );
    }
}
