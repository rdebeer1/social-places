import React, { Component } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';

//assets
import imagePlaceHolder from '../../assets/social-place.jpg';

class PickImage extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image 
            style={styles.previewImage}
            source={imagePlaceHolder} />
        </View>
        <View style={styles.button}>
            <Button title='Pick Image' />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#eee',
      width: '80%',
      height: 150
  },
  button: {
      margin: 8,
      width: '60%'
  },
  previewImage: {
      width: '100%',
      height: '100%'
  }
});

export default PickImage;