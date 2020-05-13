/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, TextInput } from 'react-native';
import { Picker } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import AsyncStorage from '@react-native-community/async-storage';
import {ethers} from 'ethers';
const provider = ethers.getDefaultProvider();
const aet = "0x8c9E4CF756b9d01D791b95bc2D0913EF2Bf03784";
const usdt = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const aetAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokens","type":"uint256"}],"name":"onePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"},{"name":"_Address","type":"address"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"minter","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"TokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"_from","type":"address"}],"name":"TokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const usdtAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
const aetContract = new ethers.Contract(aet, aetAbi, provider);
const usdtContract = new ethers.Contract(usdt, usdtAbi, provider);  
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class ExchangeCoins extends Component {

    constructor(props){
        super(props);
        this.state={
            BtcPrivateKey : '',
            EthPrivateKey : '',
            amount : 0,
            aetAmount : 0,
            currentExchange : 'ETH',
            ethBalance : '',
			btcBalance : '',
			aetBalance : '',
			aetPrice : '',
			aetChange : '',
			btcPrice : '',
			btcChange : '',
			ethPrice : '',
            ethChange : '',
            ethAddress : '',
            btcAddress : ''
        }
        this.handleProcess = this.handleProcess.bind(this);
        this.fetchAetPrice = this.fetchAetPrice.bind(this);
		this.fetchEthPrice = this.fetchEthPrice.bind(this);
		this.fetchBtcPrice = this.fetchBtcPrice.bind(this);
		this.fetchEthBalance = this.fetchEthBalance.bind(this);
		this.fetchBitcoinBalance = this.fetchBitcoinBalance.bind(this);
        this.fetchAetBalance = this.fetchAetBalance.bind(this);
        this.handleExchange = this.handleExchange.bind(this);
    }

    handleExchange = value => {
        this.setState({
          currentExchange: value
        });
      }

    handleAmount = amount => {
        if(this.currentExchange == "ETH"){
        let total = amount * this.state.ethPrice;
        let aetTotal = total/this.state.aetPrice;
        this.setState({ amount: amount, aetAmount : aetTotal})
        }
        else{
            let total = amount * this.state.btcPrice;
            let aetTotal = total/this.state.aetPrice;
            this.setState({ amount: amount, aetAmount : aetTotal})  
        }
    };

    async UNSAFE_componentWillMount(){
        this.fetchAetPrice();
		this.fetchBtcPrice();
		this.fetchEthPrice();
        try{
			const eth = await AsyncStorage.getItem('ethWallet')
			let ether = JSON.parse(eth);
			const btc = await AsyncStorage.getItem('btcWallet')
			let bitcoin = JSON.parse(btc);
            this.setState({BtcPrivateKey : bitcoin.btcPrivateKey, btcAddress : bitcoin.btcAddress});
            this.setState({EthPrivateKey : ether.ethPrivateKey, ethAddress : ether.ethAddress});
            this.fetchEthBalance(ether.ethAddress);
			this.fetchBitcoinBalance(bitcoin.btcAddress);
			this.fetchAetBalance(ether.ethAddress);
		}
		catch(err){
            console.log(err);
			alert("Error");
		}
    }

    fetchAetPrice(){
		fetch('https://api.coingecko.com/api/v3/coins/aerotoken')
		.then((response) => response.json())
		.then(responseJson => {
			this.setState({aetPrice:responseJson.market_data.current_price.usd});
			this.setState({aetChange:responseJson.market_data.price_change_percentage_1h_in_currency.usd});
		}
		)
	}

	fetchEthPrice(){
		fetch('https://api.coingecko.com/api/v3/coins/ethereum')
		.then((response) => response.json())
		.then(responseJson => {
			this.setState({ethPrice:responseJson.market_data.current_price.usd});
			this.setState({ethChange:responseJson.market_data.price_change_percentage_1h_in_currency.usd});
		}
		)
	}

	fetchBtcPrice(){
		fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
		.then((response) => response.json())
		.then(responseJson => {
			this.setState({btcPrice:responseJson.market_data.current_price.usd});
			this.setState({btcChange:responseJson.market_data.price_change_percentage_1h_in_currency.usd});
		}
		)
	}


	fetchEthBalance(a){
		let address = a;
        provider.getBalance(address).then((balance) => {
        let etherString = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
        this.setState({ethBalance : etherString});
        });
	}

	fetchAetBalance(a){
		let address = a;
		aetContract.balanceOf(address)
		.then(balance => {
			let aetString = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
			this.setState({aetBalance:aetString});
		})
	}

	fetchBitcoinBalance(a){
		fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${a}/balance`)
		.then((response) => response.json())
		.then(responseJson => {
			const balanceTemp = (responseJson.balance)*0.00000001;
			const finalBal = parseFloat(balanceTemp).toFixed(4) ;
			this.setState({btcBalance : finalBal });
		})
	}

    handleProcess(){
        if(this.state.currentExchange == "BTC" && this.state.btcBalance > this.state.amount+0.0002){
        const body = {
            value_satoshis : this.state.amount,
            from_private: this.state.privateKey,
            aetAmount : this.state.aetAmount,
            aetReciever : this.state.ethAddress
        }
        console.log(body);
        fetch('https://aet-wallet.herokuapp.com/api/v1/exchange/btc',{
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
        .catch(err=>{
            console.log(err);
        });
        }
        else if(this.state.currentExchange == "ETH" && this.state.btcBalance > this.state.amount+0.0002){
            const body = {
                amount : this.state.amount,
                privateKey: this.state.privateKey,
                aetAmount : this.state.aetAmount,
                aetReciever : this.state.ethAddress
            }
            fetch('https://aet-wallet.herokuapp.com/api/v1/exchange/eth',{
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
            .catch(err=>{
                console.log(err);
            }) 
        }
        else{
            alert("Insufficient Balance")
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
				marginLeft: wp('21%'),
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
                marginBottom: hp('3%'),
            },
            innerContainer1: {
                flex: 1,
                flexDirection: 'row',
                marginTop: hp('2.5%'),
                alignSelf: 'center',
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
                top: hp('2%',),
                right: wp('8'),
            },
            exchangeButton: {
                backgroundColor: '#32374f',
                padding: 20,
                borderRadius: 50,
                alignSelf: 'center',
            },
            button: {
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                paddingTop: 13,
                paddingBottom: 13,
                width: wp('75%'),
                borderRadius: 35,
                position: 'relative',
                marginTop: hp('7%'),
                marginBottom: 15,
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
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
            },
            logo: {
                width: 35,
                height: 42,
                marginHorizontal: 10,
            },
		});

		const { statusBar, section, header, icon, title, innerContainer, innerContainer1, inputBox, picker, downIcon, exchangeButton, exchangeIcon, infoContainer, balanceHeading, logo, button, buttonText } = styles;
        return (
            <>
            <ScrollView>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
                        <Icon type = "font-awesome" name = "angle-left" color = "#fff" size = {wp('15%')} iconStyle = {icon} onPress = {this.handleBack} underlayColor = "transparent" />
                        <Text style = {title}>Exchange AET</Text>
					</View>
					<View>
                        <View style = {innerContainer}>
                            <TextInput onChangeText={this.handleAmount} style = {inputBox}/>
                            <Picker selectedValue = {this.state.currentExchange} style = {picker}  onValueChange={(value) => this.handleExchange(value)}>
                                <Picker.Item label = "ETH" value="ETH" />
                                <Picker.Item label = "BTC" value="BTC" />
                            </Picker>
                            <Icon type = "feather" name = "chevron-down" color = "white" iconStyle = {downIcon}/>
                        </View>
                        <View style = {exchangeButton}>
                            <Icon type = "font-awesome" name = "exchange" color = "white" iconStyle = {exchangeIcon}/>
                        </View>
                        <View style = {innerContainer1}>
                            <TextInput value={`${this.state.aetAmount}`} editable={false} style = {inputBox}/>
                            <Picker mode = "dialog" style = {picker} selectedValue = "AET">
                                <Picker.Item label = "AET"/>
                            </Picker>
                            <Icon type = "feather" name = "chevron-down" color = "white" iconStyle = {downIcon}/>
                        </View>
                     <TouchableOpacity  style={button} activeOpacity = {0.9} onPress = {this.handleProcess}>
                            <Text style={buttonText}>Exchange</Text>
                        </TouchableOpacity>
                	</View>
                    <View style = {{marginBottom: hp('16.5%')}}>
                    <View style = {infoContainer}>
                        <Text style = {balanceHeading}>Your {this.state.currentExchange} balance will be</Text>
                        <View>
                        {this.state.currentExchange == "ETH" ?  <Text style = {{color: 'white', fontSize: 19, fontFamily: 'Armegoe', textAlign: 'right'}}>{this.state.ethBalance - this.state.amount + " " + this.state.currentExchange}</Text>
                        : <Text style = {{color: 'white', fontSize: 19, fontFamily: 'Armegoe', textAlign: 'right'}}>{this.state.btcBalance - this.state.amount + " " + this.state.currentExchange}</Text> }
                        </View>
                    </View>
                    <View style = {infoContainer}>
                        <View style = {{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                            <Text style = {balanceHeading}>Your</Text>
                            <Image source = {require('../assets/images/Logo.png')} style = {logo}/>
                            <Text style = {balanceHeading}>balance will be</Text>
                        </View>
                        <View>
                            <Text style = {{color: 'white', fontSize: 19, fontFamily: 'Armegoe', textAlign: 'right'}}>{this.state.aetAmount} AET</Text>
                        </View>
                    </View>
                    </View>
				</View>
                </ScrollView>
            </>
        );
    }
}
