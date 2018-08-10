import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';


class PickLocation extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button 
            title='Pick Location'
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
  placeholder: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#eee',
      width: '80%',
      height: 150
  },
  button: {
      margin: 8,
      width: '60%'
  }
});

export default PickLocation;