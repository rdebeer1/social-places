import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

//actions
import * as actions from '../../store/actions/index';
//components
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
//utility
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#F25F5C',
        navBarTextFontFamily: 'OperatorMonoSSm-Medium'
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            controls: {
            placeName: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
        })
    }

    componentDidUpdate() {
        if (this.props.placeAdded) {
            this.props.navigator.switchToTab({
                tabIndex: 0
            })
        }
    }
    
    onNavigatorEvent = event => {
        if (event.type === 'ScreenChangedEvent') {
            if (event.id === 'willAppear') {
                this.props.onStartAddPlace()
            }
        }
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }
    
    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        })
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value, 
            this.state.controls.location.value,
            this.state.controls.image.value
        );
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
    }

    render () {
        let submitButton = (
            <Button
                color = '#70C1B3'
                title='Share'
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                } />
        );

        if (this.props.isLoading) {
            submitButton = (
                <ActivityIndicator />
            )
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <PickImage
                        onImagePicked={this.imagePickedHandler}
                        ref={ref => (this.imagePicker = ref)} />
                    <PickLocation 
                        onLocationPick={this.locationPickedHandler}
                        ref={ref => (this.locationPicker = ref)} />
                    <PlaceInput
                        placeData={this.state.controls.placeName} 
                        onChangeText={this.placeNameChangedHandler} />
                    <View style={this.props.isLoading ? styles.loadingButton : styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        margin: 8,
        width: '60%',
        borderColor: '#70C1B3',
        borderWidth: 2,
        borderRadius: 50
    },
    loadingButton: {
        borderWidth: 0,
        margin: 10
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(actions.addPlace(placeName, location, image)),
        onStartAddPlace: () => dispatch(actions.startAddPlace())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);