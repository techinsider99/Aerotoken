/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, StatusBar, Platform, ScrollView, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { ethers } from 'ethers';

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
            pin: '',
            inputVisible: false,
            inputEye: 'eye-slash',
            phrase: '',
            error1: '',
            error2: '',
            loading: false,
        };
    }

    async UNSAFE_componentWillMount() {
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

    toggleInput = () => {
        const input = this.state.inputVisible;
        if (input === false) {
            this.setState({
                inputVisible: true,
                inputEye: 'eye',
            });
        } else {
            this.setState({
                inputVisible: false,
                inputEye: 'eye-slash',
            });
        }
    }

    handlePin = pin => this.setState({ pin: pin })

    handlePhrase = phrase => this.setState({ phrase: phrase })

    handlePhraseSubmit = async () => {
		let phrase  = this.state.phrase;
        let pin = this.state.pin;
        if (phrase) {
            if (pin) {
                try {
                        this.setState({ loading: true });
                        let walletTemp = ethers.Wallet.fromMnemonic(phrase);
                        const walletJson = {
                            'ethAddress' : walletTemp.address,
                            'ethPrivateKey' : walletTemp.privateKey,
                            'ethMnemonic' : walletTemp.mnemonic,
                        };
                        const wallet = JSON.stringify(walletJson);
                        await AsyncStorage.setItem('ethWallet', wallet);
                        await AsyncStorage.setItem('@pin', pin);
                        this.setState({ loading: false }, () => {
                            Alert.alert(
                                'Reset Successful!',
                                'You will be logged out. Please enter your new pin to login',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => this.resetNavigation(),
                                    },
                                ],
                                {
                                    cancelable: false,
                                }
                            );
                        });
                }
                catch (error){
                    Alert.alert('Error', error);
                }
            } else {
                this.setState({
                    error1: '',
                    error2: 'Enter the new pin',
                });
            }
        } else {
            this.setState({ error1: 'Enter the backup phrase' });
        }
    }

    resetNavigation = () => {
        this.props.navigation.popToTop();
		this.props.navigation.replace('Login');
    }

    handleCopy = copyText => {
        const options = {
			enableVibrateFallback: true,
			ignoreAndroidSystemSettings: false,
        };
        Clipboard.setString(copyText);
        ReactNativeHapticFeedback.trigger('impactLight', options);
        Toast.show('Copied to clipboard');
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
				marginLeft: wp('23.5%'),
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
            inputText: {
                fontFamily: 'Armegoe',
                color: 'white',
                fontSize: 18,
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
                marginTop: hp('3%'),
            },
            copyText: {
                fontFamily: 'Armegoe',
                color: '#FFBA00',
                fontSize: 18,
                marginTop: hp('0.5%'),
            },
            copyIcon: {
                marginRight: wp('1%'),
            },
			button: {
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                paddingTop: 13,
                paddingBottom: 13,
                width: wp('45%'),
                borderRadius: 35,
                position: 'relative',
                marginTop: hp('4%'),
                marginBottom: 10,
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 18,
                textAlign: 'center',
            },
            inputContainer: {
                marginLeft: wp('-4%'),
                borderBottomWidth: 0,
                width: wp('73%'),
            },
		});

		const { statusBar, section, header, icon, title, detailContainer, mainText, grayText, yellowText, button, buttonText, inputText, inputContainer, copyText, copyIcon } = styles;
        const { ethAddress, ethAddressVisible, ethEye, ethPrivate, ethPrivateVisible, ethPrivateEye, ethPhrase, ethPhraseVisible, ethPhraseEye, btcAddress, btcAddressVisible, btcAddressEye, btcPrivate, btcPrivateVisible, btcPrivateEye, btcPublic, btcPublicVisible, btcPublicEye, btcPhrase, btcPhraseVisible, btcPhraseEye, inputEye, inputVisible, pin, phrase, error1, error2, loading } = this.state;
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
						<Text style = {title}>Settings</Text>
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
                            <Input inputStyle = {grayText} multiline = {ethAddressVisible} inputContainerStyle = {inputContainer} secureTextEntry = {!ethAddressVisible} editable = {false} value = {ethAddress}/>
                            <TouchableOpacity activeOpacity = {0.9} style = {{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}} onPress = {() => this.handleCopy(ethAddress)}>
                                <Icon type = "feather" name = "copy" color = "#FFBA00" size = {wp('4%')} iconStyle = {copyIcon}/>
                                <Text style = {copyText}>COPY</Text>
                            </TouchableOpacity>
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
                            <Input inputStyle = {grayText} multiline = {ethPrivateVisible} inputContainerStyle = {inputContainer} secureTextEntry = {!ethPrivateVisible} editable = {false} value = {ethPrivate}/>
                            <TouchableOpacity activeOpacity = {0.9} style = {{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}} onPress = {() => this.handleCopy(ethPrivate)}>
                                <Icon type = "feather" name = "copy" color = "#FFBA00" size = {wp('4%')} iconStyle = {copyIcon}/>
                                <Text style = {copyText}>COPY</Text>
                            </TouchableOpacity>
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
                            <Input inputStyle = {grayText} multiline = {ethPhraseVisible} inputContainerStyle = {inputContainer} secureTextEntry = {!ethPhraseVisible} editable = {false} value = {ethPhrase}/>
                            <TouchableOpacity activeOpacity = {0.9} style = {{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}} onPress = {() => this.handleCopy(ethPhrase)}>
                                <Icon type = "feather" name = "copy" color = "#FFBA00" size = {wp('4%')} iconStyle = {copyIcon}/>
                                <Text style = {copyText}>COPY</Text>
                            </TouchableOpacity>
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
                            <Input inputStyle = {grayText} multiline = {btcAddressVisible} inputContainerStyle = {inputContainer} secureTextEntry = {!btcAddressVisible} editable = {false} value = {btcAddress}/>
                            <TouchableOpacity activeOpacity = {0.9} style = {{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}} onPress = {() => this.handleCopy(btcAddress)}>
                                <Icon type = "feather" name = "copy" color = "#FFBA00" size = {wp('4%')} iconStyle = {copyIcon}/>
                                <Text style = {copyText}>COPY</Text>
                            </TouchableOpacity>
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
                            <Input inputStyle = {grayText} multiline = {btcPrivateVisible} inputContainerStyle = {inputContainer} secureTextEntry = {!btcPrivateVisible} editable = {false} value = {btcPrivate}/>
                            <TouchableOpacity activeOpacity = {0.9} style = {{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}} onPress = {() => this.handleCopy(btcPrivate)}>
                                <Icon type = "feather" name = "copy" color = "#FFBA00" size = {wp('4%')} iconStyle = {copyIcon}/>
                                <Text style = {copyText}>COPY</Text>
                            </TouchableOpacity>
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
                            <Input inputStyle = {grayText} multiline = {btcPublicVisible} inputContainerStyle = {inputContainer} secureTextEntry = {!btcPublicVisible} editable = {false} value = {btcPublic}/>
                            <TouchableOpacity activeOpacity = {0.9} style = {{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}} onPress = {() => this.handleCopy(btcPublic)}>
                                <Icon type = "feather" name = "copy" color = "#FFBA00" size = {wp('4%')} iconStyle = {copyIcon}/>
                                <Text style = {copyText}>COPY</Text>
                            </TouchableOpacity>
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
                            <Input inputStyle = {grayText} multiline = {btcPhraseVisible} inputContainerStyle = {inputContainer} secureTextEntry = {!btcPhraseVisible} editable = {false} value = {btcPhrase}/>
                            <TouchableOpacity activeOpacity = {0.9} style = {{flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center'}} onPress = {() => this.handleCopy(btcPhrase)}>
                                <Icon type = "feather" name = "copy" color = "#FFBA00" size = {wp('4%')} iconStyle = {copyIcon}/>
                                <Text style = {copyText}>COPY</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style = {yellowText}>About Aerotoken</Text>
                        <View style = {detailContainer}>
                            <View style = {{flexDirection: 'row'}}>
                                <View style = {{flex: 1, marginBottom: hp('-1%')}}>
                                    <Text style = {mainText}>
                                        App version
                                    </Text>
                                </View>
                                <Text style = {grayText}>1.0.0</Text>
                            </View>
                        </View>
                        <Text style = {yellowText}>Reset Pin</Text>
                        <View style = {detailContainer}>
                            <View style = {{marginHorizontal: wp('3%')}}>
                                <Input inputStyle = {inputText} value = {phrase}  inputContainerStyle = {{ marginHorizontal: wp('-4%'),borderBottomWidth: 2, marginBottom: hp('3%') }} placeholder = "Enter 12-word backup phrase" placeholderTextColor = "#8E8C8C" onChangeText = {this.handlePhrase} errorStyle = {{color: 'red', marginLeft: wp('-4%'), marginTop: hp('-2%'), fontSize: 13}} errorMessage = {error1}/>
                            </View>
                            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: wp('3%')}}>
                                <View style = {{flex: 1}}>
                                    <Input inputStyle = {inputText} secureTextEntry = {!inputVisible} value = {pin}  inputContainerStyle = {{ marginLeft: wp('-4%'),borderBottomWidth: 2 }} placeholder = "Enter a new pin" placeholderTextColor = "#8E8C8C" onChangeText = {this.handlePin} keyboardType = "numeric" errorStyle = {{color: 'red', marginLeft: wp('-4%'), marginTop: hp('1%'), fontSize: 13}} errorMessage = {error2}/>
                                </View>
                                <Icon type = "font-awesome" name = {inputEye} color = "white" onPress = {this.toggleInput} underlayColor = "transparent"/>
                            </View>
                            <TouchableOpacity style = {button} disabled = {loading} activeOpacity = {0.5} onPress = {this.handlePhraseSubmit}>
                                <Text style = {buttonText}>
                                    {
                                        loading ? 'Please wait' : 'Reset Pin'
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    </View>
                </View>
            </>
        );
    }
}
