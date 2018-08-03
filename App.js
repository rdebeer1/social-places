import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ListItem from './src/components/ListItem/ListItem';

export default class App extends Component {
  state = {
    placeName: '',
    places: []
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === '') {
      return
    };
    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      };
    });
  };

  render() {
    const placesOutput = this.state.places.map((place, i) => (
<<<<<<< HEAD
      <ListItem key={i} placeName={place} />
=======
      <Text key={i}>{place}</Text>
>>>>>>> ed0c130428a93b4b3e6faeb3411264f4077ad076
    ));

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.placeInput}
            placeholder='A Social Place'
            value={this.state.placeName}
            onChangeText={this.placeNameChangedHandler} />
          <Button 
            title='Add'
            style={styles.placeButton}
            onPress={this.placeSubmitHandler} />
        </View>
<<<<<<< HEAD
        <View style={styles.listContainer}>
=======
        <View>
>>>>>>> ed0c130428a93b4b3e6faeb3411264f4077ad076
          {placesOutput}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }, 
  listContainer: {
    width: '100%'
  }
});
