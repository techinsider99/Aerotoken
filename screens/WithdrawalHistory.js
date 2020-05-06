/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Image,Text,ScrollView,Linking, TouchableOpacity} from 'react-native';
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
            UsdtTx : [],
            AetTx : []
        }
        this.fetchBtcTx=this.fetchBtcTx.bind(this);
		this.fetchEthTx = this.fetchEthTx.bind(this);
		this.fetchAetTx = this.fetchAetTx.bind(this);
		this.fetchUsdtTx = this.fetchUsdtTx.bind(this);
    }

    async UNSAFE_componentWillMount(){
        try{
        const eth = await AsyncStorage.getItem('ethWallet')
		let ether = JSON.parse(eth);
		const btc = await AsyncStorage.getItem('btcWallet')
        let bitcoin = JSON.parse(btc);
        this.fetchBtcTx(bitcoin.btcAddress);
        this.fetchEthTx(ether.ethAddress);
        this.fetchAetTx(ether.ethAddress);
		this.fetchUsdtTx(ether.ethAddress);	
        }
        catch(err){
            console.log(err);
            alert("Error")
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
                console.log(json);
                let BtcTx = this.state.BtcTx;
                BtcTx = [];
				for(let i=0;i<json.txrefs.length;i++){
                    if(json.txrefs[i].spent === false){
						var value = parseFloat(json.txrefs[i].value * 0.00000001).toFixed(8)
                        BtcTx.push(
                            <View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
                             <TouchableOpacity onPress={()=>{Linking.openURL(`https://www.blockchain.com/btc/tx/${json.txrefs[i].tx_hash}`)}}>
								<View style = {{flexDirection: 'row'}}>
                                    <View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
                                        <Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 15,}}>{new Date(json.txrefs[i].confirmed).toLocaleDateString() + " " + new Date(json.txrefs[i].confirmed).toLocaleTimeString()}</Text>
                                    </View> 
                                    <View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center',marginLeft:15}}>
                                    <Text style = {{fontFamily: 'Armegoe',color: value >= 0 ? '#2CC593' : '#FFBA00', fontSize: 18}}>
										{ value >= 0 ? '+' : '-' } {value} BTC
									</Text>
                                    </View>
                                </View>
							</TouchableOpacity>
                            </View>
                        );
                    }
				}
				this.setState({BtcTx});
            })
            .catch(err=>{
                console.log(err);
            }) 
	}

	fetchEthTx(a){
		let address = a;
		let etherscanProvider = new ethers.providers.EtherscanProvider();
		etherscanProvider.getHistory(address).then((history) => {
            let EthTx = this.state.EthTx;
            EthTx = [];
			for(let i=history.length-1; i>-1;i--){
				if(ethers.utils.formatEther(history[i].value) > 0 && history[i].to !== address){
				let date = new Date(history[i].timestamp*1000).toLocaleDateString() + " " + new Date(history[i].timestamp*1000).toLocaleTimeString();
				let value = parseFloat(ethers.utils.formatEther(history[i].value)).toFixed(4);
				EthTx.push(
				<View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
				<TouchableOpacity onPress={()=>{Linking.openURL(`https://etherscan.io/tx/${history[i].hash}`)}}>
					<View style = {{flexDirection: 'row'}}>
						<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
							<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18,}}>{date}</Text>
						</View>
						<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
							<Text style = {{fontFamily: 'Armegoe',color: value >= 0 ? '#2CC593' : '#FFBA00', fontSize: 18}}>
								{ value >= 0 ? '+' : '-' } {value} ETH
							</Text>
						</View>
					</View>
				</TouchableOpacity >
				</View>	
				)
				}
			}
			this.setState({EthTx});
            })	
            .catch(err=>{
                console.log(err);
            })	
	}

	fetchAetTx(a){
		let address = a
		const body = {
			address : address
		}
		fetch('https://api-aet.herokuapp.com/api/v1/coinHistory',{
			method: 'post',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.json())
		.then(json => {
            let AetTx = this.state.AetTx;
            AetTx = [];
			for(let i=json.txrefs.length-1; i>-1;i--){
            // console.log((json.txrefs[i].to.toString ));
			if(json.txrefs[i].tokenSymbol == "AET" && json.txrefs[i].to !== address){
			let date = new Date(json.txrefs[i].timeStamp*1000).toLocaleDateString() + " " + new Date(json.txrefs[i].timeStamp*1000*1000).toLocaleTimeString();
			let value = parseFloat(ethers.utils.formatEther(json.txrefs[i].value)).toFixed(2);
			AetTx.push(
			<View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
				<TouchableOpacity onPress={()=>{Linking.openURL(`https://etherscan.io/tx/${json.txrefs[i].hash}`)}}>
					<View style = {{flexDirection: 'row'}}>
						<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
							<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18,}}>{date}</Text>
						</View>
						<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
						<Text style = {{fontFamily: 'Armegoe',color: value >= 0 ? '#2CC593' : '#FFBA00', fontSize: 18}}>
								{ value >= 0 ? '+' : '-' } {value} AET
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>	)
			}
		}
		this.setState({AetTx});
        })
        .catch(err=>{
            console.log(err);
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
            let UsdtTx = this.state.UsdtTx;
            UsdtTx = [];
			for(let i=json.txrefs.length-1; i>-1;i--){
			if(json.txrefs[i].tokenSymbol == "USDT" && json.txrefs[i].to !== address){
			let date = new Date(json.txrefs[i].timeStamp*1000).toLocaleDateString() + " " + new Date(json.txrefs[i].timeStamp*1000*1000).toLocaleTimeString();
			let value = parseFloat(ethers.utils.formatEther(json.txrefs[i].value)*1000000000000).toFixed(2);
			UsdtTx.push(
			<View style={{position: 'relative',backgroundColor: '#272a3d',marginHorizontal: wp('5%'),marginVertical: hp('1%'),padding: wp('5%'),borderRadius: 15}}>
				<TouchableOpacity onPress={()=>{Linking.openURL(`https://etherscan.io/tx/${json.txrefs[i].hash}`)}}>
					<View style = {{flexDirection: 'row'}}>
						<View style = {{flexGrow: 1, flexWrap: 'wrap'}}>
							<Text style = {{fontFamily: 'Armegoe',color: 'white',fontSize: 18}}>{date}</Text>
						</View>
						<View style = {{flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
							<Text style = {{fontFamily: 'Armegoe',color: value >= 0 ? '#2CC593' : '#FFBA00', fontSize: 18}}>
								{ value >= 0 ? '+' : '-' } {value} USDT
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>	)
			}
		}
		this.setState({UsdtTx});
		})
	}
    render() {
        const styles = StyleSheet.create({
            section: {
                backgroundColor: '#060E17',
                minHeight: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            emptyImage: {
                transform: [
                    { scale: 0.15 },
                ],
            },
        });

		const { section, emptyImage } = styles;
		const { BtcTx, EthTx, UsdtTx, AetTx } = this.state;
        return (
            <View style = {section}>
			{
				BtcTx.length === 0 && EthTx.length === 0 && UsdtTx.length === 0 && AetTx.length === 0 ?

				<Image source = {require('../assets/images/EmptyFinal.png')} style = {emptyImage}/>

				:

				<ScrollView>
					<View style={section}>
					{BtcTx}
					{EthTx}
					{UsdtTx}
					{AetTx}
					</View>
				</ScrollView>
			}
            </View>
        );
    }
}
