import React, { Component } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import BackgroundButton from '../UI/BackgroundButton/BackgroundButton';
class PickImage extends Component {
  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    })
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({
      title: 'Pick a Photo',
      maxWidth: 800,
      maxHeight: 600
    }, res => {
      if (res.didCancel) {
        console.log('User Cancelled');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        this.setState({
          pickedImage: {
            uri: res.uri
          }
        });
        this.props.onImagePicked({
          uri: res.uri,
          base64: res.data
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image 
            style={styles.previewImage}
            source={this.state.pickedImage} />
        </View>
        <View style={styles.buttonContainer}>
            <BackgroundButton
            style={styles.button}
              onPress={this.pickImageHandler}>
              Upload A Photo
              </BackgroundButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 25
  },
  placeholder: {
      backgroundColor: 'white',
      width: '80%',
      height: 150,
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 5,
      elevation: 5,
      borderWidth: 1,
      borderColor: 'white'
  },
  button: {
      margin: 8,
      borderColor: '#70C1B3',
      borderWidth: 2,
      borderRadius: 50,
  },
  previewImage: {
      width: '100%',
      height: '100%'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  }
});

export default PickImage;