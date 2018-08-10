import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';

//components
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

const placeInput = props => (
  <DefaultInput 
    placeholder='Place Name' 
    value={props.placeName}
    onChangeText={props.onChangeText} />
);


export default placeInput;