import React from 'react';
import { Text, StyleSheet } from 'react-native';

const headingText = props => (
  <Text 
    {...props}
    style={[styles.headingText, props.style, {color: props.textColor}]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  headingText: {
    fontSize: 36,
    fontWeight: 'bold'
  }
});

export default headingText;
