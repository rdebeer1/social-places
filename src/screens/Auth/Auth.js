import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';

//screens
import startMainTabs from '../MainTabs/startMainTabs';
//components
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import BackgroundButton from '../../components/UI/BackgroundButton/BackgroundButton'
//source
import backgroundImage from '../../assets/social-place.jpg'

class AuthScreen extends Component {
    state = {
       viewMode: Dimensions.get('window').height > 500 
            ? 'portrait' 
            : 'landscape'
    }
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', (dims) => {
            this.setState({
                viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
            })
        })
    }
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
                        <DefaultInput 
                            placeholder='E-Mail' 
                            style={styles.input} 
                            placeholderTextColor='rgba(45, 42, 46, 0.8)' />
                        <View style={this.state.viewMode === 'portrait' 
                            ? styles.portraitPasswordContainer 
                            : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === 'portrait' 
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    placeholder='Password' 
                                    style={styles.input} 
                                    placeholderTextColor='rgba(45, 42, 46, 0.8)' />
                            </View>
                            <View style={this.state.viewMode === 'portrait' 
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    placeholder='Confirm Password' 
                                    style={styles.input} 
                                    placeholderTextColor='rgba(45, 42, 46, 0.8)' />
                            </View>
                        </View>
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
    portraitPasswordContainer: {
        flexDirection: 'column',
    },
    landscapePasswordContainer: {
        flexDirection: 'row'
    },
    portraitPasswordWrapper: {
        flex: 0
    },
    landscapePasswordWrapper: {
        flex: 1
    }
});

export default AuthScreen;