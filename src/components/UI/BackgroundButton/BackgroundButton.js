import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

const backgroundButton = props => {

  const content = (
    <View
      {...props} 
      style={[
        styles.backgroundButton, props.style, props.disabled ? styles.disabled : null]}>
      <Text style={props.disabled ? styles.disabledText : styles.text}>{props.children}</Text>
    </View>
  )

  if (props.disabled) {
    return content;
  }

  return (
    <TouchableOpacity 
      onPress={props.onPress}
      style={styles.touchableOpacity}>
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    width: '50%',
  },
  backgroundButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  text: {
    color: '#70C1B3',
    textAlign: 'center',
    fontFamily: 'OperatorMonoSSm-Medium'
  }, 
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#50514F',
    width: '50%'
  },
  disabledText: {
    color: '#50514F',
    fontFamily: 'OperatorMonoSSm-Medium',
    textAlign: 'center',
  }
});

export default backgroundButton;