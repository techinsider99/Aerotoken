/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Currency extends Component {

    render() {
        const styles = StyleSheet.create({
            mainContainer: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: '#272a3d',
                marginHorizontal: wp('9%'),
                marginVertical: hp('1%'),
                paddingHorizontal: wp('3%'),
                paddingVertical: hp('1.5%'),
                borderRadius: 20,
            },
            logo: {
                width: wp('9%'),
                height: hp('5.5%'),
                margin: 10,
            },
            details1: {
                paddingVertical: hp('1%'),
                flexDirection: 'column',
                flexWrap: 'wrap',
                flexGrow: 10,
            },
            details2: {
                paddingVertical: hp('1%'),
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                flexGrow: 1,
            },
        });
        const { mainContainer, logo, details1, details2 } = styles;
        const { avatar, currencyName, currencyValue, price, difference, abr } = this.props;
        return (
            <>
                <TouchableOpacity style = {mainContainer} activeOpacity = {0.8} onPress = {() => this.props.navigateTo('CurrencyDetail', currencyName, price, currencyValue, avatar, abr)}>
                    <View>
                        <Image source = {avatar} style = {logo}/>
                    </View>
                    <View style = {details1}>
                        <Text style = {{fontFamily: 'Armegoe', color: "white", fontSize: 19, marginBottom: 8}}>{currencyName}</Text>
                        <Text style = {{fontFamily: 'Armegoe', color: "#6F6E71", fontSize: 16}}>{currencyValue}</Text>
                    </View>
                    <View style = {details2}>
                        <Text style = {{fontFamily: 'Armegoe', color: "white", fontSize: 19, marginBottom: 8}}>$ {currencyValue*price}</Text>
                        <Text style = {{fontFamily: 'Armegoe', color: "#FFBA00", fontSize: 16}}>{difference}</Text>
                    </View>
                </TouchableOpacity>
            </>
        );
    }
}
