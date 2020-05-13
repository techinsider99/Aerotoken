/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Image,Text,ScrollView,Linking, TouchableOpacity, Alert, RefreshControl, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
const {ethers}  = require('ethers');
export default class DepositHistory extends Component {

    constructor(props){
        super(props);
        this.state={
            BtcTx : [],
            EthTx : [],
			CoinTx: [],
			refreshing: false,
			btcAddress: '',
			ethAddress: '',
			btcLoading: false,
			ethLoading: false,
			coinsLoading: false,
        };
        this.fetchBtcTx = this.fetchBtcTx.bind(this);
		this.fetchEthTx = this.fetchEthTx.bind(this);
    }

    async UNSAFE_componentWillMount(){
        try {
        const eth = await AsyncStorage.getItem('ethWallet');
		let ether = JSON.parse(eth);
		const btc = await AsyncStorage.getItem('btcWallet');
		let bitcoin = JSON.parse(btc);
        this.fetchBtcTx(bitcoin.btcAddress);
        this.fetchEthTx(ether.ethAddress);
        this.fetchTransactions(ether.ethAddress);
        }
        catch (err){
            console.log(err);
            Alert.alert('Error', err);
        }
    }

    fetchBtcTx(a){
		const body = {
			address : a,
		};
		this.setState({ btcAddress: a, btcLoading: true }, () => {
			fetch('https://aet-wallet.herokuapp.com/api/v1/history',{
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                let BtcTx = this.state.BtcTx;
                BtcTx = [];
				for(let i=0;i<json.txrefs.length;i++){
                    if(json.txrefs[i].spent === false){
						var value = parseFloat(json.txrefs[i].value * 0.00000001).toFixed(5);
                        BtcTx.push(
                            <View style={{position: 'relative',backgroundColor: '#272a3d',marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15, width: wp('85%')}}>
                             <TouchableOpacity onPress={()=>{Linking.openURL(`https://www.blockchain.com/btc/tx/${json.txrefs[i].tx_hash}`)}}>
								<View style = {{flexDirection: 'row'}}>
                                    <View style = {{flex: 1, flexWrap: 'wrap'}}>
                                        <Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18}}>
											{new Date(json.txrefs[i].confirmed).toLocaleDateString()}
										</Text>
										<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18, marginTop: hp('0.2%')}}>
											{new Date(json.txrefs[i].confirmed).toLocaleTimeString()}
										</Text>
                                    </View>
                                    <View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end', alignContent: 'flex-end'}}>
                                    <Text style = {{fontFamily: 'Armegoe',color: '#FFBA00', fontSize: 18}}>
										-{value} BTC
									</Text>
                                    </View>
                                </View>
							</TouchableOpacity>
                            </View>
                        );
                    }
				}
				this.setState({BtcTx, btcLoading: false});
            })
            .catch(err=>{
				this.setState({ btcLoading: false });
                console.log(err);
            });
		}); 
	}

	fetchEthTx(a){
		let address = a;
		this.setState({ ethAddress: address, ethLoading: true }, () => {
			let etherscanProvider = new ethers.providers.EtherscanProvider();
			etherscanProvider.getHistory(address).then((history) => {
				let EthTx = this.state.EthTx;
				EthTx = [];
				for(let i=history.length-1; i>-1;i--){
					if(ethers.utils.formatEther(history[i].value) > 0 && history[i].from === address){
					let date = new Date(history[i].timestamp*1000).toLocaleDateString();
					let time = new Date(history[i].timestamp*1000).toLocaleTimeString();
					let value = parseFloat(ethers.utils.formatEther(history[i].value)).toFixed(5);
					EthTx.push(
					<TouchableOpacity style={{position: 'relative',backgroundColor: '#272a3d',marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15, width: wp('85%')}} onPress={()=>{Linking.openURL(`https://etherscan.io/tx/${history[i].hash}`)}}>
						<View style = {{flexDirection: 'row'}}>
							<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
								<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18, marginRight: wp('1%')}}>{date}</Text>
								<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18, marginTop: hp('0.2%')}}>{time}</Text>
							</View>
							<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end', alignContent: 'flex-end'}}>
								<Text style = {{fontFamily: 'Armegoe',color: '#FFBA00', fontSize: 18}}>
									-{value} ETH
								</Text>
							</View>
						</View>
					</TouchableOpacity >
					)
					}
				}
				this.setState({EthTx, ethLoading: false});
			})
			.catch(err=>{
				this.setState({ ethLoading: false });
				console.log(err);
			});
		});
	}

	fetchTransactions = address => {
		const body = {
			address: address,
		};
		this.setState({ coinsLoading: true }, () => {
			axios.post('https://aet-wallet.herokuapp.com/api/v1/coinHistory', body)
		.then(res => {
			let data = res.data.txrefs;
			data = data.filter(transaction => {
				return transaction.from === address.toLowerCase();
			}).map(transaction => {
				return (
					<>
						{
							<View style={{position: 'relative',backgroundColor: '#272a3d',marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15, width: wp('85%')}}>
								<TouchableOpacity onPress={()=>{Linking.openURL(`https://etherscan.io/tx/${transaction.hash}`)}}>
									<View style = {{flexDirection: 'row'}}>
										<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
											<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18, marginRight: wp('1%')}}>
												{new Date(transaction.timeStamp*1000).toLocaleDateString()} 
											</Text>
											<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18, marginTop: hp('0.2%')}}>
												{new Date(transaction.timeStamp*1000*1000).toLocaleTimeString()}
											</Text>
										</View>
										<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end', alignContent: 'flex-end'}}>
											<Text style = {{fontFamily: 'Armegoe',color: '#FFBA00', fontSize: 18}}>
												-{
													transaction.tokenSymbol === 'USDT' ?

													parseFloat(ethers.utils.formatEther(transaction.value)*1000000000000).toFixed(5)

													:

													parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(5)
												} { transaction.tokenSymbol }
											</Text>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						}
					</>
				);
			});
			this.setState({ CoinTx: data, coinsLoading: false});
		}).catch(err => {
			this.setState({ coinsLoading: false });
			console.log(err);
		});
		});
	}

	handleRefresh = () => {
		const { ethAddress, btcAddress } = this.state;
		this.setState({ refreshing: true }, () => {
			this.fetchBtcTx(btcAddress);
			this.fetchEthTx(ethAddress);
			this.fetchTransactions(ethAddress);
		})
		this.setState({ refreshing: false });
	}

    render() {
        const styles = StyleSheet.create({
            historySection: {
                backgroundColor: '#060E17',
                minHeight: '100%',
                flex: 1,
				alignItems: 'center',
				paddingTop: hp('2%'),
				paddingHorizontal: wp('1%'),

			},
			section: {
				flex: 1,
				minHeight: '100%',
				backgroundColor: '#060E17',
				alignItems: 'center',
				justifyContent: 'center',
			},
            emptyImage: {
                transform: [
                    { scale: 0.15 },
                ],
            },
        });

		const { historySection, section, emptyImage } = styles;
		const { BtcTx, EthTx, CoinTx, refreshing, btcLoading, ethLoading, coinsLoading } = this.state;
        return (
            <>
			{
				btcLoading ?

				<View style = {section}>
					<ActivityIndicator size = {50} color = "#FFBA00" />
				</View>

				: ethLoading ?

				<View style = {section}>
					<ActivityIndicator size = {50} color = "#FFBA00" />
				</View>

				: coinsLoading ?

				<View style = {section}>
					<ActivityIndicator size = {50} color = "#FFBA00" />
				</View>

				:

				BtcTx.length === 0 && EthTx.length === 0 && CoinTx.length === 0 ?

				<View style = {section}>
					<Image source = {require('../assets/images/EmptyFinal.png')} style = {emptyImage}/>
				</View>

				:

				<View style = {historySection}>
					<ScrollView refreshControl = {<RefreshControl refreshing = {refreshing} onRefresh = {this.handleRefresh}/>}>
						{BtcTx}
						{EthTx}
						{CoinTx}
					</ScrollView>
				</View>
			}
            </>
        );
    }
}
