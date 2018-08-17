import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image
        source={props.placeImage}
        style={styles.placeImage}
        resizeMode= 'cover' />
      <Text style={styles.placeNameText}>
        {props.placeName}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'rgba(36, 123, 160, 0.8)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  placeNameText: {
    fontFamily: 'OperatorMonoSSm-MediumItalic',
    color: 'white',
    letterSpacing: -1
  }
});

export default listItem;