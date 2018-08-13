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
            : 'landscape',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                }
            }
        }
    }
    
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: 
                dims.window.height > 500 
                    ? 'portrait' 
                    : 'landscape'
        });
    }

    loginHandler = () => {
        startMainTabs();
    }

    updateInputState = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value
                    }
                }
            }
        })
    }

    render () {
        return (
            <ImageBackground 
                style={styles.backgroundImage} 
                source={backgroundImage}>
                <View 
                    style={styles.container}>
                    <View 
                        style={styles.inputContainer}>
                        <DefaultInput 
                            placeholder='E-Mail' 
                            style={styles.input} 
                            placeholderTextColor='rgba(255, 255, 255, 0.7)'
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.updateInputState('email', val)} />
                        <View style={this.state.viewMode === 'portrait' 
                            ? styles.portraitPasswordContainer 
                            : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === 'portrait' 
                                ? styles.portraitPasswordWrapper 
                                : [styles.landscapePasswordWrapper, {marginRight: 4}]}>
                                <DefaultInput 
                                    placeholder='Password' 
                                    style={styles.input} 
                                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)} />
                            </View>
                            <View style={this.state.viewMode === 'portrait' 
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    placeholder='Confirm Password' 
                                    style={styles.input} 
                                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                                    value={this.state.controls.confirmPassword.value}
                                    onChangeText={(val) => this.updateInputState('confirmPassword', val)} />
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
        width: '80%',
    },
    input: {
        borderWidth: 0,
        width: '100%',
        padding: 10,
        margin: 2,
        color: 'white',
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
    },
    landscapePasswordContainer: {
        flexDirection: 'row'
    },
    portraitPasswordWrapper: {
        flex: 0,
    },
    landscapePasswordWrapper: {
        flex: 1,
    }
});

export default AuthScreen;