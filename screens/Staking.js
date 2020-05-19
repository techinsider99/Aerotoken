/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar, Platform, Alert, ActivityIndicator } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {ethers} from 'ethers';
import '../shim.js';
import crypto from 'crypto';
import { KEY, IV } from '../config';
import { Buffer } from 'buffer';
const provider = ethers.getDefaultProvider('homestead');
const aet = "0x8c9E4CF756b9d01D791b95bc2D0913EF2Bf03784";
const aetAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokens","type":"uint256"}],"name":"onePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"},{"name":"_Address","type":"address"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"minter","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"TokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"_from","type":"address"}],"name":"TokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const aetContract = new ethers.Contract(aet, aetAbi, provider);
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;
export default class Staking extends Component {

     constructor(props){
         super(props);
         this.state={
             amount : '',
             error : '',
             aetBalance : '',
             ethBalance :'',
             totalStaked : '',
             privateKey:'',
             loading: false,
         };
         this.handleAmount = this.handleAmount.bind(this);
         this.fetchAetBalance = this.fetchAetBalance.bind(this);
         this.handleStake = this.handleStake.bind(this);
         this.fetchEthBalance = this.fetchEthBalance.bind(this);
     }

    async componentWillMount(){
		try {
			const eth = await AsyncStorage.getItem('ethWallet');
            let ether = JSON.parse(eth);
            this.setState({privateKey : ether.ethPrivateKey});
            this.fetchAetBalance(ether.ethAddress);
            this.fetchEthBalance(ether.ethAddress);
            this.getStaking();
	    } catch (error) {
		   Alert.alert(error);
        }
    }

    getStaking = async () => {
        try {
            let staked = await AsyncStorage.getItem('@staked');
            if (staked !== null) {
                this.setState({totalStaked: staked});
            } else {
                Alert.alert('AET Staking', 'Welcome to AET Staking, Get 1% of your total staked tokens every month');
            }
        } catch (err) {
            console.log(err);
        }
    }

    setStaking = async staking => {
        try {
            await AsyncStorage.setItem('@staked', staking);
        } catch (err) {
            console.log(err);
        }
    }

    handleAmount = amount => this.setState({ amount: amount })

    encrypt = data => {
        const key = KEY;
        const iv = IV;
        let encipher = crypto.createCipheriv('aes-256-cbc', key, iv),
            buffer = Buffer.concat([
                encipher.update(data),
                encipher.final(),
            ]);
        return buffer.toString('base64');
    }

    handleStake(){
        if (this.state.amount) {
            if (parseFloat(this.state.aetBalance) < 1000.0){
                this.setState({ error: 'You must have minimum 1000 coins to stake' });
            } else if (parseFloat(this.state.amount) >= parseFloat(this.state.aetBalance)) {
                this.setState({ error: 'Insufficient AET balance' });
            }
            else if (parseFloat(this.state.ethBalance) < 0.0001){
                this.setState({ error: 'Insufficient Gas. Fund Your Account to pay for Gas' });
            } else if (parseFloat(this.state.amount) > 1000.0){
                let privateKey = this.state.privateKey;
                privateKey = this.encrypt(privateKey);
                let amount = parseFloat(this.state.amount);
                const data = {
                    key: privateKey,
                    amount: amount,
                };
                console.log(data);
                this.setState({ loading: true, error: ''}, () => {
                    axios.post('https://aet-wallet.herokuapp.com/stake', data)
                    .then(res => {
                        let state = res.data;
                        console.log('Staking response:', state);
                        this.setState({ loading: false });
                        try {
                            if (state.success === 'Transaction Success') {
                                Alert.alert('Info', 'Transaction success');
                                let total = parseFloat(this.state.totalStaked) + parseFloat(this.state.amount);
                                let totalString = total.toString();
                                this.setStaking(totalString);
                                this.setState({ amount: '' });
                                this.getStaking();
                            } else {
                                Alert.alert('Error', 'Cannot stake amount. Please try again');
                            }
                        }
                        catch (err){
                            this.setState({ loading: false });
                            Alert.alert('Error', 'Cannot stake amount. Please try again');
                        }
                    }).catch(err => {
                        this.setState({ loading: false });
                        console.log(err);
                        Alert.alert('Error', 'Cannot stake amount. Please try again');
                    });
                });
            } else {
                this.setState({ error: 'Minimum staking is 1000' });
            }
        } else {
            this.setState({ error: 'Enter the amount to stake' });
        }
    }

    fetchEthBalance(a){
        let address = a;
        this.setState(() => {
            provider.getBalance(address)
            .then((balance) => {
                let etherString = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
                this.setState({
                    ethBalance: etherString,
                });
            });
        });
	}

    fetchAetBalance(a){
        let address = a;
        this.setState(() => {
            aetContract.balanceOf(address)
            .then(balance => {
                let aetString = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
                this.setState({
                    aetBalance: aetString,
                });
            });
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
				marginLeft: wp('22%'),
            },
            staking: {
				color: 'white',
				fontFamily: 'Armegoe',
				fontSize: 20,
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
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
            },
            inputContainer: {
				flexDirection: 'row',
				alignSelf: 'center',
				marginTop: hp('5%'),
				width: wp('75%'),
			},
			inputBox: {
				alignSelf: 'center',
				borderBottomColor: 'white',
				paddingBottom: 5,
				fontFamily: 'Armegoe',
				fontSize: 18,
				color: 'white',
            },
            errorText: {
                fontFamily: 'Armegoe',
            },
		});

        const { statusBar, section, header, icon, title, button, buttonText, inputBox, inputContainer, staking, errorText } = styles;
        const { loading: isLoading, error } = this.state;
        const { navigation } = this.props;
        return (
            <>
                <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
				<View style = {section}>
					<View style = {header}>
						<Icon type = "feather" name = "bar-chart" color = "#fff" size = {wp('9.5%')} iconStyle = {icon} onPress = {() => navigation.openDrawer()} underlayColor = "transparent" />
						<Text style = {title}>Stake AET</Text>
                    </View>
                    <View style = {inputContainer}>
                    <Input inputStyle = {inputBox} inputContainerStyle = {{borderBottomWidth: 1, borderBottomColor: 'white'}} value = {this.state.amount} onChangeText = {this.handleAmount} placeholder = "Enter Amount to Stake" placeholderTextColor = "white" keyboardAppearance = "dark" keyboardType = "numeric" errorMessage = {error} errorStyle = {errorText}/>
                	</View>
					<TouchableOpacity style = {button} activeOpacity = {0.8} disabled = {isLoading} onPress = {this.handleStake}>
                        <Text style = {buttonText}>{ isLoading ? 'Please wait' : 'Start Staking'}</Text>
                    </TouchableOpacity>
                    <View style = {{display:'flex',alignItems:'center',justifyContent:'center',marginTop : 20}}>
						<Text style = {staking}>Total Staked : {!this.state.totalStaked ? 0 : this.state.totalStaked}</Text>
                    </View>
                </View>
            </>
        );
    }
}
