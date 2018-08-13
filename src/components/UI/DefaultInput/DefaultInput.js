import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const defaultInput = props => (
  <View style={[
    styles.inputContainer, 
    !props.valid && props.touched 
      ? styles.invalid 
      : null, 
    props.valid && props.touched 
      ? styles.valid 
      : null]}>
    <TextInput 
      {...props}
      style={[styles.input, props.style]} 
      underlineColorAndroid='transparent'
      />
    </View>
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    margin: 8,
  },
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    margin: 1
  },
  invalid: {
    borderColor: 'red'
  },
  valid: {
    borderColor: 'green'
  }
});

export default defaultInput;
