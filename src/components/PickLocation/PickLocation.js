import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import BackgroundButton from '../UI/BackgroundButton/BackgroundButton';
class PickLocation extends Component {

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      focusedLocation: {
        latitude: 30.2659598,
        longitude: -97.7540223,
        latitudeDelta: 0.0122,
        longitudeDelta: 
          Dimensions.get('window').width / 
          Dimensions.get('window').height * 
          0.0122
    },
    locationChosen: true
    })
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.pickLocationHandler(coordsEvent)
    }, err => {
        console.log(err);
        alert('Locating Position Failed: Please pick manually');
    })
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker
        coordinate={this.state.focusedLocation} />
    }
    return(
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onPress={this.pickLocationHandler}
          initialRegion={this.state.focusedLocation}
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
          ref={ref => this.map = ref}>
          {marker}
        </MapView>
        <View style={styles.buttonContainer}>
          <BackgroundButton
            style={styles.button}
            onPress={this.getLocationHandler} >
            Locate Me
          </BackgroundButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
      margin: 8,
      borderColor: '#70C1B3',
      borderWidth: 2,
      borderRadius: 50,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  }
});

export default PickLocation;