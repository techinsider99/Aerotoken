/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import DepositHistory from './DepositHistory';
import WithdrawalHistory from './WithdrawalHistory';


const Tab = createMaterialTopTabNavigator();
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class HistoryTabs extends Component {
    render() {
		const mainStyles = StyleSheet.create({
			tabsContainer: {
				flexDirection: 'row',
				backgroundColor: '#060E17',
				paddingLeft: 25,
                paddingRight: 25,
                position: 'relative',
                zIndex: 100,
            },
            statusBar: {
                width: '100%',
                backgroundColor: '#060E17',
                height: STATUS_BAR_HEIGHT,
			},
			section: {
                backgroundColor: '#060E17',
                minHeight: '100%',
                flex: 1,
                position: 'relative',
                zIndex: -100,
			},
			header: {
                flexDirection: 'row',
                backgroundColor: '#060E17',
                paddingTop: 20,
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
				marginLeft: wp('24%'),
			},
		});

        const { tabsContainer, header, icon, title } = mainStyles;
        const { navigation } = this.props;

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
                                borderBottomWidth: 3,
                                borderBottomColor: isFocused ? '#FFBA00' : 'transparent',
								marginLeft: 20,
								backgroundColor: '#060E17',
							},
							tabLabel: {
								textAlign: 'center',
								fontFamily: 'Armegoe',
                                color: isFocused ? '#FFBA00' : '#8E8C8C',
                                fontSize: 16,
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
							activeOpacity = {0.9}
						>
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
            
					<View style = {header}>
						<Icon type = "feather" name = "bar-chart" color = "#fff" size = {wp('9.5%')} iconStyle = {icon} onPress = {() => navigation.openDrawer()} underlayColor = "transparent" />
						<Text style = {title}>History</Text>
					</View>
				
              	<Tab.Navigator initialRouteName = "Deposit" tabBar = {props => <TabBar {...props}/>}>
					<Tab.Screen name = "Deposit" component = {DepositHistory} />
					<Tab.Screen name = "Withdrawal" component = {WithdrawalHistory} />
				</Tab.Navigator>
            </>
        );
    }
}
