import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

//components
import DefaultInput from '../UI/DefaultInput/DefaultInput'

const placeInput = props => (
  <DefaultInput
    viewStyle={styles.placeView}
    style={styles.placeInput}
    placeholder='Place Name' 
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText} />
);

const styles = StyleSheet.create({
  placeView: {
      width: '80%',
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: '#eee',
      padding: 10,
      backgroundColor: 'white'
  },
  placeInput: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})


export default placeInput;