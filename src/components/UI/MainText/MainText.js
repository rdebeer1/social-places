import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = props => (
  <Text 
    {...props}
    style={[styles.mainText, props.style]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  mainText: {
    color: '#247BA0',
    backgroundColor: 'transparent',
    marginBottom: 100,
    fontFamily: 'OperatorMonoSSm-MediumItalic',
    letterSpacing: -3,
  }
});

export default mainText;