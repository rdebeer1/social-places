import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ImageBackground} from 'react-native';
import { connect } from 'react-redux';

// components
import PlaceList from '../../components/PlaceList/PlaceList';
//actions
import * as actions from '../../store/actions/index';
//assets
import backgroundImage from '../../assets/find-place.jpg'
class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#F25F5C',
        navBarTextFontFamily: 'OperatorMonoSSm-Medium'
    }

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    onNavigatorEvent = event => {
        if (event.type === 'ScreenChangedEvent') {
            if (event.id === 'willAppear') {
                this.props.onLoadPlaces();
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
    
    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    }
    
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: 'social-places.PlaceDetailScreen',
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    }


    render () {
        let content = (
            <Animated.View
                style={{
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [2, 1]
                            })
                        }
                    ]
                }}>
                <TouchableOpacity
                    onPress={this.placesSearchHandler}>
                    <View 
                        style={styles.searchButton}>
                        <Text 
                            style={styles.searchButtonText}>
                            Find Places
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                <Animated.View
                    style={{
                        opacity: this.state.placesAnim
                    }}>
                    <PlaceList 
                        places={this.props.places} 
                        onItemSelected={this.itemSelectedHandler} />
                </Animated.View>
            );
        }

        return (
            this.state.placesLoaded ?
            <View>
                {content}
            </View> :
            <ImageBackground 
            source={backgroundImage}
                style={ styles.buttonContainer}>
                {content}
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButton: {
        backgroundColor: 'rgba(0,0,0, 0.2)',
        borderColor: '#FFE066',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: '#FFE066',
        fontWeight: 'bold',
        fontSize: 26,
        fontFamily: 'OperatorMonoSSm-BookItalic',
        letterSpacing: -3
    },
    
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(actions.getPlaces())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);