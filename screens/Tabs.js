/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import Wallet from './Wallet';
import Exchange from './Exchange';
import Profile from './Profile';
import HistoryTabs from './HistoryTabs';
import Staking from './Staking';

const Tab =  createBottomTabNavigator();

export default class Tabs extends Component {
    render() {
		const mainStyles = StyleSheet.create({
			tabsContainer: {
				flexDirection: 'row',
				backgroundColor: '#060E17',
				paddingLeft: 25,
				paddingRight: 25,
			},
		});

		const { tabsContainer } = mainStyles;

		const TabBar =  ({state, descriptors, navigation}) => {
			return (
				<View style={tabsContainer}>
					{state.routes.map((route, index) => {
						const { options } = descriptors[route.key];
						const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;

						const isFocused = state.index === index;

						const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
						};

						const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
						};

						const styles = StyleSheet.create({
							tab: {
								flex: 1,
								paddingTop: 20,
								paddingBottom: 20,
							},
							tabLabel: {
								textAlign: 'center',
								fontFamily: 'Armegoe',
								color: isFocused ? '#FFBA00' : '#8E8C8C',
							},
						});

						const { tab, tabLabel } = styles;

						return (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityStates={isFocused ? ['selected'] : []}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={tab}
						>
							{
								label === 'Wallet' ?

								<Icon type = "material" name = "account-balance-wallet" size = {35} iconStyle = {{marginBottom: hp('0.0%')}} color = { isFocused ?  '#FFBA00' : '#8E8C8C'}/>

								: label === 'Exchange' ?

								<Icon type = "ionicon" name = "ios-repeat" size = {40} iconStyle = {{marginTop: hp('-0.6%')}}  color = { isFocused ?  '#FFBA00' : '#8E8C8C'}/>

								: label === 'History' ?

								<Icon type = "material" name = "history" size = {37} iconStyle = {{marginTop: hp('-0.1%'), marginBottom: hp('-0.2')}} color = { isFocused ?  '#FFBA00' : '#8E8C8C'}/>

								:

								null

							}
							<Text style={tabLabel}>
								{label}
							</Text>
						</TouchableOpacity>
						);
					})}
			</View>
			);
		};
        return (
            <>
              	<Tab.Navigator tabBarOptions = {{labelPosition: 'below-icon'}} backBehavior = "history" initialRouteName = "Wallet" tabBar = {props => <TabBar {...props} />} >
					<Tab.Screen name = "Wallet" component = {Wallet}/>
					<Tab.Screen name = "Exchange" component = {Exchange} />
					<Tab.Screen name = "History" component = {HistoryTabs} />
					<Tab.Screen name = "Staking" component = {Staking} />
				</Tab.Navigator>
            </>
        );
    }
}
