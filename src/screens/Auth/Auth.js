import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

//actions
import * as actions from '../../store/actions/index';
//components
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import BackgroundButton from '../../components/UI/BackgroundButton/BackgroundButton';
//utility
import validate from '../../utility/validation';
//source
import backgroundImage from '../../assets/social-place.jpg';

class AuthScreen extends Component {
    state = {
       viewMode: Dimensions.get('window').height > 500 
            ? 'portrait' 
            : 'landscape',
        authMode: 'Sign In',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
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

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'Sign In' ? 'Sign Up' : 'Sign In'
            }
        })
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: 
                dims.window.height > 500 
                    ? 'portrait' 
                    : 'landscape'
        });
    }

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode)
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: 
                            key === 'password' 
                                ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) 
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    }

    render () {
        let confirmPasswordControl = null;
        let signInButton = (
            <BackgroundButton
                disabled={
                    this.state.authMode === 'Sign Up' &&
                    !this.state.controls.confirmPassword.valid || 
                    !this.state.controls.password.valid || 
                    !this.state.controls.email.valid
                }
                onPress={this.authHandler} 
                color='#29aaf4'>
                {this.state.authMode === 'Sign In' ? 'Sign In' : 'Create Account'}
            </BackgroundButton>
        )

        if (this.state.authMode === 'Sign Up') {
            confirmPasswordControl = (
                <View 
                    style={this.state.viewMode === 'portrait' 
                        ? styles.portraitPasswordWrapper 
                        : styles.landscapePasswordWrapper}>
                    <DefaultInput 
                        placeholder='Confirm Password' 
                        style={styles.input} 
                        placeholderTextColor='rgba(255, 255, 255, 0.8)'
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry />
                </View>
            )
        }

        if (this.props.isLoading) {
            signInButton = (
                <ActivityIndicator />
            )
        }

        return (
            <ImageBackground 
                style={styles.backgroundImage} 
                source={backgroundImage}>
                <KeyboardAvoidingView
                    behavior='padding' 
                    style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}>
                        <View style={styles.largeWrapper}>
                            <View style={styles.smallWrapper}>
                                <View 
                                    style={styles.inputContainer}>
                                    <DefaultInput 
                                        placeholder='E-Mail' 
                                        style={styles.input} 
                                        placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                        value={this.state.controls.email.value}
                                        onChangeText={(val) => this.updateInputState('email', val)}
                                        valid={this.state.controls.email.valid}
                                        touched={this.state.controls.email.touched} 
                                        autoCapitalize='none' 
                                        autoCorrect={false}
                                        keyboardType='email-address' />
                                    <View style={
                                        this.state.viewMode === 'portrait' || 
                                        this.state.authMode === 'Sign In'
                                            ? styles.portraitPasswordContainer 
                                            : styles.landscapePasswordContainer}>
                                        <View style={
                                            this.state.viewMode === 'portrait' || 
                                            this.state.authMode === 'Sign In'
                                                ? styles.portraitPasswordWrapper 
                                                : [styles.landscapePasswordWrapper, {marginRight: 4}]}>
                                            <DefaultInput 
                                                placeholder='Password' 
                                                style={styles.input} 
                                                placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                                value={this.state.controls.password.value}
                                                onChangeText={(val) => this.updateInputState('password', val)}
                                                valid={this.state.controls.password.valid}
                                                touched={this.state.controls.password.touched}
                                                secureTextEntry />
                                        </View>
                                        {confirmPasswordControl}
                                    </View>
                                </View>
                            </View>
                            {signInButton}
                            <BackgroundButton
                                onPress={this.switchAuthModeHandler}
                                color='#29aaf4'>
                                {this.state.authMode === 'Sign In' ? 'Sign Up' : 'Switch to Sign In'}
                            </BackgroundButton>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
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
    largeWrapper: {
        height: '100%',
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    smallWrapper: {
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(actions.tryAuth(authData, authMode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);