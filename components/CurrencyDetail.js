/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';
const {ethers}  = require('ethers');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class CurrencyDetail extends Component {

	constructor(props){
		super(props);
		this.state={
			depositWallet : '',
			tx : []
		}
		this.fetchBtcTx=this.fetchBtcTx.bind(this);
		this.fetchEthTx = this.fetchEthTx.bind(this);
		this.fetchAetTx = this.fetchAetTx.bind(this);
		this.fetchUsdtTx = this.fetchUsdtTx.bind(this);
	}

	async UNSAFE_componentWillMount(){
		const { abr } = this.props.route.params;
		try{
			const eth = await AsyncStorage.getItem('ethWallet')
			let ether = JSON.parse(eth);
			const btc = await AsyncStorage.getItem('btcWallet')
			let bitcoin = JSON.parse(btc);
			if(abr === "BTC"){
				this.setState({depositWallet : bitcoin.btcAddress});
				this.fetchBtcTx(bitcoin.btcAddress);
			}
			else if(abr == "ETH"){
				this.setState({depositWallet: ether.ethAddress});
				this.fetchEthTx(ether.ethAddress);
			}
			else if(abr == "AET"){
				this.setState({depositWallet: ether.ethAddress});
				this.fetchAetTx(ether.ethAddress);
			}
			else{
				this.setState({depositWallet: ether.ethAddress});
				this.fetchUsdtTx(ether.ethAddress);	
			}
		}
		catch(err){
			alert(err);
		}
	}

	fetchBtcTx(a){
		const body={
			address : a
		}
		fetch('https://api-aet.herokuapp.com/api/v1/history',{
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
				let tx = this.state.tx;
				tx = [];
				for(let i=0;i<json.txrefs.length;i++){
					tx.push(
						<View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
							<View style = {{flexDirection: 'row'}}>
								<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
									<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18,}}>{new Date(json.txrefs[i].confirmed).toLocaleDateString() + " " + new Date(json.txrefs[i].confirmed).toLocaleTimeString()}</Text>
								</View>
								<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
								{json.txrefs[i].spent ? <Text style = {{fontFamily: 'Armegoe',color: '#2CC593',fontSize: 18}}>+ {parseFloat(json.txrefs[i].value * 0.00000001).toFixed(8)} BTC</Text> : <Text style = {{fontFamily:'Armegoe',color: '#FFBA00',fontSize: 18}}>- {parseFloat(json.txrefs[i].value * 0.00000001).toFixed(8)} BTC</Text> }
								</View>
							</View>
						</View>
					);
				}
				this.setState({tx});
            })
	}

	fetchEthTx(a){
		let address = a;
		let etherscanProvider = new ethers.providers.EtherscanProvider();
		etherscanProvider.getHistory(address).then((history) => {
			let tx = this.state.tx;
			tx = []
			for(let i=history.length-1; i>-1;i--){
				if(ethers.utils.formatEther(history[i].value) > 0){
				let date = new Date(history[i].timestamp*1000).toLocaleDateString() + " " + new Date(history[i].timestamp*1000).toLocaleTimeString();
				let value = parseFloat(ethers.utils.formatEther(history[i].value)).toFixed(4);
				tx.push(
				<View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
					<View style = {{flexDirection: 'row'}}>
						<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
							<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18,}}>{date}</Text>
						</View>
						<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
							{history[i].to == address ? <Text style = {{fontFamily: 'Armegoe',color: '#2CC593',fontSize: 18}}>+ {value} ETH</Text> : <Text style = {{fontFamily:'Armegoe',color: '#FFBA00',fontSize: 18}}>- {value} ETH</Text>}
						</View>
					</View>
				</View>	
				)
				}
			}
			this.setState({tx});
			})		
	}

	fetchAetTx(a){
		let address = a
		const body = {
			address : address
		}
		fetch('https://api-aet.herokuapp.com/api/v1/coinHistory',{
		method: 'post',
		body:    JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.json())
		.then(json => {
			let tx = this.state.tx;
			tx = [];
			for(let i=json.txrefs.length-1; i>-1;i--){
			if(json.txrefs[i].tokenSymbol == "AET"){
			let date = new Date(json.txrefs[i].timeStamp*1000).toLocaleDateString() + " " + new Date(json.txrefs[i].timeStamp*1000*1000).toLocaleTimeString();
			let value = parseFloat(ethers.utils.formatEther(json.txrefs[i].value)).toFixed(2);
			tx.push(
			<View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
					<View style = {{flexDirection: 'row'}}>
						<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
							<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18,}}>{date}</Text>
						</View>
						<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
							{json.txrefs[i].to == address ? <Text style = {{fontFamily: 'Armegoe',color: '#2CC593',fontSize: 18}}>+ {value} AET</Text> : <Text style = {{fontFamily:'Armegoe',color: '#FFBA00',fontSize: 18}}>- {value} AET</Text>}
						</View>
					</View>
			</View>	)
			}
		}
		this.setState({tx});
		})
	}

	fetchUsdtTx(a){
		let address = a
		const body = {
			address : address
		}
		fetch('https://api-aet.herokuapp.com/api/v1/coinHistory',{
		method: 'post',
		body:    JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.json())
		.then(json => {
			let tx = this.state.tx;
			tx = [];
			for(let i=json.txrefs.length-1; i>-1;i--){
			if(json.txrefs[i].tokenSymbol == "USDT"){
			let date = new Date(json.txrefs[i].timeStamp*1000).toLocaleDateString() + " " + new Date(json.txrefs[i].timeStamp*1000*1000).toLocaleTimeString();
			let value = parseFloat(ethers.utils.formatEther(json.txrefs[i].value)*1000000000000).toFixed(2);
			tx.push(
			<View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
					<View style = {{flexDirection: 'row'}}>
						<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
							<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18}}>{date}</Text>
						</View>
						<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
							{json.txrefs[i].to == address ? <Text style = {{fontFamily: 'Armegoe',color: '#2CC593',fontSize: 18}}>+ {value} USDT</Text> : <Text style = {{fontFamily:'Armegoe',color: '#FFBA00',fontSize: 18}}>- {value} USDT</Text>}
						</View>
					</View>
			</View>	)
			}
		}
		this.setState({tx});
		});
	}

	handleCopy = async () => {
		const options = {
			enableVibrateFallback: true,
			ignoreAndroidSystemSettings: false,
		};
		ReactNativeHapticFeedback.trigger('impactLight', options);
		const { depositWallet } = this.state;
		Clipboard.setString(depositWallet);
	}

	handleSend = (currencyName, abr, avatar,currencyValue,price) => {
		this.props.navigation.navigate('Send', {
			currencyName: currencyName,
			abr: abr,
			avatar: avatar,
			currencyValue : currencyValue,
			price : price
		});
	}

	handleReceive = (currencyName, abr) => {
		this.props.navigation.navigate('Receive', {
			currencyName: currencyName,
			abr: abr,
			address : this.state.depositWallet
		});
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
		const { currencyName, price, currencyValue, avatar, abr, cost } = this.props.route.params;
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
									<Text style = {priceText}>$ {currencyValue*price}</Text>
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
							<TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {() => this.handleSend(currencyName, abr, avatar, currencyValue, price)}>
								<Icon type = "feather" name = "arrow-up-right" color = "white" />
								<Text style = {buttonText}>Send</Text>
							</TouchableOpacity>
							<TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {() => this.handleReceive(currencyName, abr)} >
								<Icon type = "feather" name = "arrow-down-left" color = "white" />
								<Text style = {buttonText}>Receive</Text>
							</TouchableOpacity>
						</View>
						<View style = {balanceContainer}>
							<Text style = {mainText}>Your {abr} address</Text>
							<View style = {{flexDirection: 'row', marginTop: hp('1.5%'), flexWrap: 'wrap'}}>
								<View style = {{flex: 5}}>
									<Text style = {grayText}>{this.state.depositWallet}</Text>
								</View>
								<View style = {{ustifyContent: 'flex-end', flexDirection: 'column', alignContent: 'flex-end'}}>
									<Text style = {yellowText} onPress = {this.handleCopy}>COPY</Text>
								</View>
							</View>
						</View>
						<View style = {{flexDirection: 'row', marginHorizontal: wp('10%'), marginBottom: hp('2%')}}>
							<View style = {{flex: 8}}>
								<Text style = {mainText}>Transaction History</Text>
							</View>
							<View style = {{flex: 1}}>
								<Icon type = "font-awesome-5" name = "sync" color = "#8E8C8C" iconStyle = {refreshIcon}/>
							</View>
						</View>
							{this.state.tx.length === 0 ? <><Text style={{textAlign:'center',fontFamily:'Armegoe',color: '#8E8C8C',fontSize: 18}}>No Transactions</Text></> : <>{this.state.tx}</>}
					</ScrollView>
				</View>
            </>
        );
    }
}
