/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, View, TouchableOpacity, Text, StatusBar, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
export default class HomeScreen extends Component {

    constructor(props){
        this.state = {
            pin : '',
        };
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
            logo: {
                alignSelf: 'center',
                transform: [
                { scale: 0.7 },
                ],
                marginTop: hp('15%'),
            },
            button: {
                backgroundColor: '#FFBA00',
                alignSelf: 'center',
                paddingTop: 13,
                paddingBottom: 13,
                width: wp('80%'),
                borderRadius: 35,
                position: 'relative',
                marginTop: hp('28%'),
            },
            buttonText: {
                color: 'white',
                fontFamily: 'Armegoe',
                fontSize: 20,
                textAlign: 'center',
            },
            buttonCaption: {
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Armegoe',
                fontSize: 19,
                margin: 20,
            },
            textButton: {
                color: '#FFBA00',
            },
        });

        const { statusBar, section, logo, button, buttonText, buttonCaption, textButton } = styles;
        const { navigation } = this.props;
        
        return (
            <>
               <View style = {statusBar}>
                    <StatusBar barStyle = "light-content" backgroundColor = "#060E17"/>
                </View>
                <SafeAreaView>
                    <View style = {section}>
                        <Image source = {require('../assets/images/Logo.png')} style = {logo}/>
                        <TouchableOpacity style = {button} activeOpacity = {0.9} onPress = {() => navigation.navigate('CreatePin')}>
                            <Text style = {buttonText}>Create New Wallet</Text>
                        </TouchableOpacity>
                        <Text style = {buttonCaption}>Already have a wallet? <Text style = {textButton} onPress = {() => navigation.navigate('ImportWallet')}>Import wallet</Text></Text>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}
