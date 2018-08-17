import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

//components
import DefaultInput from '../UI/DefaultInput/DefaultInput'

const placeInput = props => (
  <DefaultInput
    viewStyle={styles.placeView}
    style={styles.placeInput}
    placeholder='Place Name'
    placeholderTextColor='#50514F'
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText} />
);

const styles = StyleSheet.create({
  placeView: {
      width: '50%',
      borderWidth: 2,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: '#50514F',
      padding: 10,
      backgroundColor: 'white'
  },
  placeInput: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 18,
    color: '#247BA0',
    fontFamily: 'OperatorMonoSSm-MediumItalic'
  }
})


export default placeInput;