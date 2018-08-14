import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 30.2659598,
      longitude: -97.7540223,
      latitudeDelta: 0.0122,
      longitudeDelta: 
        Dimensions.get('window').width / 
        Dimensions.get('window').height * 
        0.0122
    }
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      }
    })
  }

  render() {
    const { region } = this.props;
    console.log(region);

    return(
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onPress={this.pickLocationHandler}
          initialRegion={this.state.focusedLocation}
          region={this.state.focusedLocation}>
        </MapView>
        <View style={styles.button}>
          <Button 
            title='Locate Me'
            onPress={() => alert('Pick Location')} />
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
      width: '60%'
  }
});

export default PickLocation;