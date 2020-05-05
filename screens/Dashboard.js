/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import Tabs from './Tabs';

const { Navigator, Screen } = createDrawerNavigator();

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
				backgroundColor: 'transparent',
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
				marginBottom: hp('-5%'),
			},
			versionText: {
				fontFamily: 'Armegoe',
				color: 'white',
				textAlign: 'center',
				marginBottom: hp('5%'),
			},
		});

		const { drawer, closeIcon, label, contentContainer, logo, versionText } = styles;
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
							activeBackgroundColor = "#151721"
							onPress = {() => navigation.navigate('Wallet')}
						/>
						<DrawerItem
							label = "Settings"
							labelStyle = {label}
							icon = {() => <Icon type = "feather" name = "settings" color = "white"/>}
							activeBackgroundColor = "#151721"
							onPress = {() => navigation.navigate('Profile')}
						/>
						<DrawerItem
							style = {{marginTop: hp('4%')}}
							label = "Logout"
							labelStyle = {label}
							icon = {() => <Icon type = "feather" name = "log-out" color = "white"/>}
							activeBackgroundColor = "#151721"
							onPress = {() => navigation.replace('Login')}
						/>
					</DrawerContentScrollView>
					<View>
						<Image source = {require('../assets/images/Logo.png')} style = {logo}/>
						<Text style = {versionText}>Version 1.0.0</Text>
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
