import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const placeInput = props => (
  <TextInput
    style={styles.placeInput} 
    placeholder='Place Name' 
    value={props.placeName}
    onChangeText={props.onChangeText}
    underlineColorAndroid = 'transparent' />
);

const styles = StyleSheet.create({
  placeInput: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#eee',
      padding: 5,
      margin: 8,
  }
})


export default placeInput;