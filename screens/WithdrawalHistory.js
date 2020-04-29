/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class DepositHistory extends Component {
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
                    { scale: 0.6 }
                ],
            },
        });

        const { section, emptyImage } = styles;

        return (
            <>
                <View style = {section}>
                    <Image source = {require('../assets/images/Empty.png')} style = {emptyImage}/>
                </View>
            </>
        );
    }
}
