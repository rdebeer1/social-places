import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
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
        navBarButtonColor: 'orange'
    }

    state = {
        controls: {
            placeName: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
    }
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }
    
    onNavigatorEvent = event => {
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

    placeAddedHandler = () => {
        if (this.state.controls.placeName.value.trim() !== '') {
            this.props.onAddPlace(this.state.controls.placeName.value)
        }
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput
                        placeData={this.state.controls.placeName} 
                        onChangeText={this.placeNameChangedHandler} />
                    <View style={styles.button}>
                        <Button 
                            title='Share'
                            onPress={this.placeAddedHandler}
                            disabled={!this.state.controls.placeName.valid} />
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
        width: '60%'
    }
});

mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(actions.addPlace(placeName)),
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);