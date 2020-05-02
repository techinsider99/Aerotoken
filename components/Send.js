/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';
import 'ethers/dist/shims.js';
import AsyncStorage from '@react-native-community/async-storage';
import  {ethers,utils} from 'ethers';
const provider = ethers.getDefaultProvider();
const aet = "0x8c9E4CF756b9d01D791b95bc2D0913EF2Bf03784";
const usdt = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const aetAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokens","type":"uint256"}],"name":"onePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"},{"name":"_Address","type":"address"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"minter","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"TokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"_from","type":"address"}],"name":"TokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const usdtAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class Send extends Component {

    constructor(props){
        super(props);
        this.state={
            reciever : '',
            amount : 0,
            usdPrice : 0,
            privateKey:''
        }
        this.handleSend = this.handleSend.bind(this);
    }

    async UNSAFE_componentWillMount(){
        const {abr} = this.props.route.params;
        try{
			const eth = await AsyncStorage.getItem('ethWallet')
			let ether = JSON.parse(eth);
			const btc = await AsyncStorage.getItem('btcWallet')
			let bitcoin = JSON.parse(btc);
			if(abr === "BTC"){
				this.setState({privateKey : bitcoin.btcPrivateKey});
			}
			else{
				this.setState({privateKey: ether.ethPrivateKey});
			}
		}
		catch{
			alert("Error");
		}
    }

	handleReciever = reciever => this.setState({ reciever: reciever });

    handleAmount = amount => this.setState({ amount: amount });

    handleSend(){
        const {abr} = this.props.route.params;
        const { currencyValue} = this.props.route.params;
        if(this.state.amount  < currencyValue){
        if(abr == "BTC"){
            const body = {
                to_address : this.state.reciever,
                value_satoshis : this.state.amount,
                from_private: this.state.privateKey
            }
            console.log(body);
            fetch('https://api-aet.herokuapp.com/api/v1/send/btc',{
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
        }
        else if(abr == "ETH"){
            let privateKey = this.state.privateKey;
            let wallet = new ethers.Wallet(privateKey, provider); 
            let tx = {
                to: '0x4742A08d64091B6a1c4104984f3b0331B1C95f4f',
                value: ethers.utils.parseEther(`${this.state.amount}`)
            };      
            try{
                let sendPromise = wallet.sendTransaction(tx);
                sendPromise.then((tx) => {
                    alert(tx.hash);
                })
                .catch(err=>{
                    alert(err);
                })
            }
            catch(err){
                alert(err);
            }
        }
        else if(abr == "AET"){
            let privateKey = this.state.privateKey;
            let wallet = new ethers.Wallet(privateKey, provider); 
            const aetContract = new ethers.Contract(aet, aetAbi, wallet);
            let amount = ethers.utils.parseEther(`${this.state.amount}`);
            try{
                aetContract.transfer('0x4742A08d64091B6a1c4104984f3b0331B1C95f4f',amount)
                .then(res=>{
                    alert("Transaction Success");
                })
                .catch(err=>{
                    alert(err);
                })
            }
            catch(err){
                alert(err);
            }
        }
        else {
            let privateKey = this.state.privateKey;
            let wallet = new ethers.Wallet(privateKey, provider); 
            const usdtContract = new ethers.Contract(usdt, usdtAbi, wallet);
            let amount = ethers.utils.parseEther(`${this.state.amount}`);
            try{
                usdtContract.transfer(`${this.state.reciever}`,amount)
                .then(res=>{
                    alert("Transaction Success");
                })
                .catch(err=>{
                    alert(err);
                })
            }
            catch(err){
                alert(err);
            }
        }
    }
    else{
        alert("Insufficient Balance");
    }
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
			button: {
				position: 'relative',
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 13,
                width: wp('75%'),
                borderRadius: 25,
                marginHorizontal: wp('5%'),
                flexDirection: 'row',
                marginTop: hp('20%'),
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 18,
                textAlign: 'center',
            },
            mainText: {
                fontFamily: 'Armegoe',
                color: 'white',
                fontSize: 18,
            },
            logo: {
                width: wp('9%'),
                height: hp('5.5%'),
                alignSelf: 'center',
                transform: [
                    { scale: 1.5 },
                ],
                marginTop: hp('8%'),
            },
            container: {
                marginHorizontal: 55,
                marginVertical: 70,
            },
            inputBox: {
				alignSelf: 'center',
				borderBottomColor: 'white',
				paddingBottom: 5,
				fontFamily: 'Armegoe',
				fontSize: 15,
				color: 'white',
            },
            borderedLabel: {
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 50,
                paddingBottom: 10,
                borderBottomColor: '#7A7A7C',
                borderBottomWidth: 1,
            },
            label: {
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
            },
		});

		const { statusBar, section, header, icon, title, button, buttonText, mainText, logo, container, inputBox, borderedLabel, label } = styles;
		const { navigation } = this.props;
		const { currencyName, abr, avatar, currencyValue,price} = this.props.route.params;
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
						<Text style = {title}>Send {currencyName}({abr})</Text>
					</View>
					<View>
                        <Image source = {avatar} style = {logo}/>
                    </View>
                    <View style = {container} >
                        <Input inputStyle = {inputBox} inputContainerStyle = {{borderBottomWidth: 1, borderBottomColor: '#7A7A7C'}}  onChangeText = {this.handleReciever} placeholder = {`Tap to paste ${abr} address`} placeholderTextColor = "white" keyboardAppearance = "dark" rightIcon = {
							<Icon type = "font-awesome" name = "qrcode" color = "#7A7A7C" underlayColor = "transparent"/>
						}/>
                        <View style = {borderedLabel}>
                            <View style = {{flex: 1}}>
                            <Input onChangeText = {this.handleAmount} placeholder = {`Enter amount you wish to transfer`} placeholderTextColor = "white" keyboardAppearance = "dark" />
                            </View>
                            <View>
                                <Text style = {mainText}>{abr}</Text>
                            </View>
                        </View>
                        <View style = {label}>
                            <View style = {{flex: 1}}>
                                <Text style = {mainText}>{price*this.state.amount}</Text>
                            </View>
                            <View>
                                <Text style = {mainText}>USD</Text>
                            </View>
                        </View>
                    </View>
                    <KeyboardAvoidingView enabled = {false}>
                        <TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {this.handleSend}>
                            <Icon type = "feather" name = "arrow-up-right" color = "white" />
                            <Text style = {buttonText} >Send</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
				</View>
            </>
        );
    }
}
