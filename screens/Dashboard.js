/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import Wallet from './Wallet';
import Tabs from './Tabs';

const { Navigator, Screen } = createDrawerNavigator();
const Tab =  createBottomTabNavigator();

export default class Dashboard extends Component {
    render() {
		const styles = StyleSheet.create({
			drawer: {
				backgroundColor: '#151721',
				flex: 1,
			},
			closeIcon: {
				alignSelf: 'flex-start',
				marginLeft: 30,
				marginTop: 40,
			},
			label: {
				color: 'white',
				fontFamily: 'Armegoe',
				fontSize: 24,
			},
			contentContainer: {
				flex: 1,
				alignItems: 'flex-start',
				justifyContent: 'center',
				paddingLeft: 25,
			},
			logo: {
				alignSelf: 'center',
				transform: [
					{ scale: 0.4 },
				],
			},
		});

		const { drawer, closeIcon, label, contentContainer, logo } = styles;
		const { navigation } = this.props;

		const DrawerContent = () => {
			return (
				<>
					<View style = {closeIcon}>
						<Icon type = "feather" name = "x" color = "white" size = {wp('8%')} onPress = {() => navigation.dispatch(DrawerActions.closeDrawer())} underlayColor = "transparent"/>
					</View>
					<DrawerContentScrollView {...this.props} contentContainerStyle = {contentContainer}>
						<DrawerItem
							label = "Wallet"
							labelStyle = {label}
							icon = {() => <Icon type = "material" name = "account-balance-wallet" color = "white"/>}
							style = {{marginBottom: 40}}
							onPress = {() => navigation.navigate('Wallet')}
						/>
						<DrawerItem
							label = "Logout"
							labelStyle = {label}
							icon = {() => <Icon type = "feather" name = "log-out" color = "white"/>}
							onPress = {() => navigation.replace('Login')}
						/>
					</DrawerContentScrollView>
					<View>
						<Image source = {require('../assets/images/Logo.png')} style = {logo}/>
					</View>
				</>
			);
		};

        return (
            <>
				<Navigator initialRouteName = "Tabs" drawerStyle = {drawer} drawerContent = {(props) => <DrawerContent {...props} />}>
					<Screen name = "Tabs" component = {Tabs} />
				</Navigator>
            </>
        );
    }
}
