/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, ScrollView, Alert, ActivityIndicator, RefreshControl} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import Currency from '../components/Currency';
import Aerotoken from '../assets/images/Logo.png';
import Ethereum from '../assets/images/Ethereum.png';
import Bitcoin from '../assets/images/Bitcoin.png';
import USDT from '../assets/images/USDT.png';
import AsyncStorage from '@react-native-community/async-storage';
import {ethers} from 'ethers';
import axios from 'axios';
const provider = ethers.getDefaultProvider('homestead');
const aet = "0x8c9E4CF756b9d01D791b95bc2D0913EF2Bf03784";
const usdt = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const aetAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokens","type":"uint256"}],"name":"onePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"},{"name":"_Address","type":"address"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"minter","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"TokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"_from","type":"address"}],"name":"TokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const usdtAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
const aetContract = new ethers.Contract(aet, aetAbi, provider);
const usdtContract = new ethers.Contract(usdt, usdtAbi, provider);
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;
export default class Dashboard extends Component {

	constructor(props){
		super(props);
		this.state={
			ethBalance : '',
			btcBalance : '',
			aetBalance : '',
			usdtBalance : '',
			aetPrice : '',
			aetChange : '',
			btcPrice : '',
			btcChange : '',
			ethPrice : '',
			ethChange : '',
			usdtPrice : '',
            usdtChange : '',
            ethLoading: false,
            ethBalanceLoading: false,
            aetLoading: false,
            aetbalanceLoading: false,
            btcLoading: false,
            btcBalanceLoading: false,
            usdtLoading: false,
            usdtBalanceLoading: false,
		}
		this.fetchAetPrice = this.fetchAetPrice.bind(this);
		this.fetchEthPrice = this.fetchEthPrice.bind(this);
		this.fetchBtcPrice = this.fetchBtcPrice.bind(this);
		this.fetchUsdtPrice = this.fetchUsdtPrice.bind(this);
		this.fetchEthBalance = this.fetchEthBalance.bind(this);
		this.fetchBitcoinBalance = this.fetchBitcoinBalance.bind(this);
		this.fetchAetBalance = this.fetchAetBalance.bind(this);
		this.fetchUsdtBalance = this.fetchUsdtBalance.bind(this);
    }

	componentWillMount(){
		this.fetchAetPrice();
		this.fetchUsdtPrice();
		this.fetchBtcPrice();
		this.fetchEthPrice();
		this.fetchBalances();
    }
    
    fetchBalances = async () => {
        try {
			const eth = await AsyncStorage.getItem('ethWallet')
			let ether = JSON.parse(eth);
			const btc = await AsyncStorage.getItem('btcWallet')
			let bitcoin = JSON.parse(btc);
			this.fetchEthBalance(ether.ethAddress);
			this.fetchBitcoinBalance(bitcoin.btcAddress);
			this.fetchAetBalance(ether.ethAddress);
			this.fetchUsdtBalance(ether.ethAddress);
		 } catch (error) {
		   Alert(error);
		}
    }

	fetchAetPrice(){
        this.setState({ aetLoading: true }, () => {
            fetch('https://api.coingecko.com/api/v3/coins/aerotoken')
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({
                    aetPrice: responseJson.market_data.current_price.usd,
                    aetChange: responseJson.market_data.price_change_percentage_24h_in_currency.usd,
                    aetLoading: false
                });
            }
            ).catch(err => {
                this.setState({ aetLoading: false })
                Alert(err)
            })
        })
	}

	fetchEthPrice(){
        this.setState({ ethLoading: true }, () => {
            fetch('https://api.coingecko.com/api/v3/coins/ethereum')
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({ 
                    ethPrice:responseJson.market_data.current_price.usd,
                    ethChange:responseJson.market_data.price_change_percentage_24h_in_currency.usd,
                    ethLoading: false
                });
            }
            ).catch(err => {
                this.setState({ ethLoading: false });
                Alert(err);
            })
        })
	}

	fetchBtcPrice(){
        this.setState({ btcLoading: true }, () => {
            fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({
                    btcPrice:responseJson.market_data.current_price.usd,
                    btcChange:responseJson.market_data.price_change_percentage_24h_in_currency.usd,
                    btcLoading: false
                });
            }
            ).catch(err => {
                this.setState({ btcLoading: false })
                Alert(err);
            })
        })
	}

	fetchUsdtPrice(){
        this.setState({ usdtLoading: true }, () => {
            fetch('https://api.coingecko.com/api/v3/coins/tether')
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({
                    usdtPrice:responseJson.market_data.current_price.usd,
                    usdtChange:responseJson.market_data.price_change_percentage_24h_in_currency.usd,
                    usdtLoading: false
                });
            }
            ).catch(err => {
                this.setState({ usdtLoading: false })
                Alert(err);
            })
        })
	}

	fetchEthBalance(a){
        let address = a;
        this.setState({ ethBalanceLoading: true }, () => {
            provider.getBalance(address)
            .then((balance) => {
                let etherString = parseFloat(ethers.utils.formatEther(balance)).toFixed(8);
                this.setState({
                    ethBalance : etherString,
                    ethBalanceLoading: false
                });
            });
        })
	}

	fetchBitcoinBalance(a){
        this.setState({ btcBalanceLoading: true }, () => {
            fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${a}/balance`)
            .then((response) => response.json())
            .then(responseJson => {
                const balanceTemp = (responseJson.balance)*0.00000001;
                const finalBal = parseFloat(balanceTemp).toFixed(8) ;
                this.setState({
                    btcBalance : finalBal,
                    btcBalanceLoading: false 
                });
            }).catch(err => {
                this.setState({ btcBalanceLoading: false })
                Alert(err)
            })
        })
    }
    
    fetchAetBalance(a){
        this.setState({ aetbalanceLoading: true }, () => {
            axios.post('https://api-aet.herokuapp.com/aetBalance', {
                address: a
            })
            .then(response => {
                this.setState({
                    aetBalance: response.data.balance,
                    aetbalanceLoading: false
                })
            }).catch(err => {
                this.setState({ aetbalanceLoading: false })
                console.log(err)
            })
        })  
	}

	fetchUsdtBalance(a){
        this.setState({ usdtBalanceLoading: true }, () => {
            axios.post('https://api-aet.herokuapp.com/usdtBalance', {
                address: a
            })
            .then(response => {
                this.setState({
                    usdtBalance: response.data.balance,
                    usdtBalanceLoading: false,
                })
            }).catch(err => {
                this.setState({ usdtBalanceLoading: false })
                console.log(err)
            })
        })
	}

	navigateScreen = (route, currencyName, price, currencyValue, avatar, abr) => {
		this.props.navigation.navigate(route, {
			currencyName: currencyName,
			price: price,
			currencyValue: currencyValue,
			avatar: avatar,
			abr: abr,
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
			refreshIcon: {
				marginLeft: wp('2%'),
                padding: 5,
                transform: [
                    { rotate: '-90deg' },
                    { rotateX: '180deg' },
                ],
                marginTop: hp('0.8%'),
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

		const { statusBar, section, header, icon, title, mainContainer, refreshIcon } = styles;
        const { navigation } = this.props;
        const { aetLoading, btcLoading, ethLoading, usdtLoading, btcBalanceLoading, aetbalanceLoading, ethBalanceLoading, usdtBalanceLoading } = this.state;
        return (
            <>
				<View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
						<Icon type = "feather" name = "bar-chart" color = "#fff" size = {wp('9.5%')} iconStyle = {icon} onPress = {() => navigation.openDrawer()} underlayColor = "transparent" />
						<Text style = {title}>Wallet</Text>
                        <Icon type = "font-awesome-5" name = "sync" color = "#8E8C8C" iconStyle = {refreshIcon} onPress={this.fetchBalances} underlayColor = "transparent"/>
					</View>
                    {
                        
                        aetLoading ?  
                        
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>

                        : btcLoading ?
                        
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>
                        
                        : ethLoading ? 
                        
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>
                        
                        : usdtLoading ?

                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>
                        
                        : btcBalanceLoading ?

                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>
                        
                        : aetbalanceLoading ?

                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>                        
                        
                        : usdtBalanceLoading ?

                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>                        
                        
                        : ethBalanceLoading ?

                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						    <ActivityIndicator size = {55} color = "#FFBA00" />
                        </View>                        

                        :

                        <View>
                            <ScrollView contentContainerStyle = {{paddingBottom: 120, marginTop: 50}}>
                                <Currency key = {0} navigateTo = {this.navigateScreen} avatar = {Aerotoken} currencyName = "Aerotoken" abr = "AET" currencyValue = {this.state.aetBalance} price = {this.state.aetPrice}  difference = {this.state.aetChange} />
                                <Currency key = {1} navigateTo = {this.navigateScreen} avatar = {Ethereum} currencyName = "Ethereum" abr = "ETH" currencyValue = {this.state.ethBalance} price = {this.state.ethPrice}   difference = {this.state.ethChange}/>
                                <Currency key = {2} navigateTo = {this.navigateScreen} avatar = {Bitcoin} currencyName = "Bitcoin" abr = "BTC" currencyValue = {this.state.btcBalance} price = {this.state.btcPrice}   difference = {this.state.btcChange} />
                                <Currency key = {3} navigateTo = {this.navigateScreen} avatar = {USDT} currencyName = "Tether USD" abr = "USDT" currencyValue = {this.state.usdtBalance} price = {this.state.usdtPrice} difference = {this.state.usdtChange} />
                            </ScrollView>
                        </View>
                    }
				</View>
                <View>
                </View>
            </>
        );
    }
}
