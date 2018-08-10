import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const backgroundButton = props => (
  <TouchableOpacity 
    onPress={props.onPress}
    style={styles.touchableOpacity}>
    <View 
      style={[
        styles.backgroundButton, 
        {backgroundColor: props.color, borderColor: props.color}]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

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
    textAlign: 'center'
  }
});

export default backgroundButton;