/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CreatePin from './screens/CreatePin';
import ConfirmPin from './screens/ConfirmPin';
import CreateWallet from './screens/CreateWallet';
import ImportWallet from './screens/ImportWallet';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import ExchangeAET from './screens/ExchangeAET';
import ExchangeCoins from './screens/ExchangeCoins';
import CurrencyDetail from './components/CurrencyDetail';
import Currency from './components/Currency';
import Send from './components/Send';
import Receive from './components/Receive';

const { Screen, Navigator } = createStackNavigator();

const App = () => {
  	return (
		<>
			<NavigationContainer>
				<Navigator headerMode = "none" initialRouteName = "Login">
					<Screen name = "Login" component = {Login}/>
					<Screen name = "Home" component = {HomeScreen}/>
					<Screen name = "CreatePin" component = {CreatePin}/>
					<Screen name = "ConfirmPin" component = {ConfirmPin}/>
					<Screen name = "CreateWallet" component = {CreateWallet}/>
					<Screen name = "ImportWallet" component = {ImportWallet}/>
					<Screen name = "Dashboard" component = {Dashboard}/>
					<Screen name = "ExchangeAET" component = {ExchangeAET}/>
					<Screen name = "ExchangeCoins" component = {ExchangeCoins}/>
					<Screen name = "Currency" component = {Currency}/>
					<Screen name = "CurrencyDetail" component = {CurrencyDetail} />
					<Screen name = "Send" component = {Send} />
					<Screen name = "Receive" component = {Receive} />
				</Navigator>
			</NavigationContainer>
		</>
  	);
};

export default App;
