import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (
  <TextInput 
    style={styles.input} 
    underlineColorAndroid='transparent' 
    {...props} />
);

export default defaultInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    margin: 8
  }
});