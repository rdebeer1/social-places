import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';

//screens
import startMainTabs from '../MainTabs/startMainTabs';
//components
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import BackgroundButton from '../../components/UI/BackgroundButton/BackgroundButton'
//source
import backgroundImage from '../../assets/social-place.jpg'

class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    }

    render () {
        return (
            <ImageBackground 
                style={styles.backgroundImage} 
                source={backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='E-Mail' style={styles.input} placeholderTextColor='rgba(45, 42, 46, 0.8)'  />
                        <DefaultInput placeholder='Password' style={styles.input} placeholderTextColor='rgba(45, 42, 46, 0.8)' />
                        <DefaultInput placeholder='Confirm Password' style={[styles.input, {borderBottomWidth: 1}]} placeholderTextColor='rgba(45, 42, 46, 0.8)' />
                    </View>
                    <BackgroundButton
                        onPress={this.loginHandler} 
                        color='#29aaf4'>
                        Sign In
                    </BackgroundButton>
                    <BackgroundButton 
                        color='#29aaf4'>
                        Sign Up
                    </BackgroundButton>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'rgba(213, 223, 236, 0.9)',
        borderColor: 'rgba(185, 209, 232, 0.8)',
        borderWidth: 1,
        width: '100%',
        borderBottomWidth: 0,
        padding: 10,
        margin: 0,
        color: '#282445'
    },
});

export default AuthScreen;