import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

const backgroundButton = props => {

  const content = (
    <View 
      style={[
        styles.backgroundButton, 
        {backgroundColor: props.color, borderColor: props.color}]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  )

  if (Platform.OS === 'android') {
    return (
      <View style={styles.touchableOpacity}>
        <TouchableNativeFeedback 
          onPress={props.onPress}>
          {content}
        </TouchableNativeFeedback>
      </View>
    );
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default backgroundButton;