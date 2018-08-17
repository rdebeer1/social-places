import React, { Component } from 'react';
import { View, Image, Text, Platform, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

//actions
import * as actions from '../../store/actions/index';

class PlaceDetail extends Component {
  state = {
    viewMode: 'portrait'
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 
        ? 'portrait' 
        : 'landscape'
    });
  }

  placeDeleteHandler = key => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View 
        style={[
          styles.container, this.state.viewMode === 'portrait' 
            ? styles.portraitContainer 
            : styles.landscapeContainer
        ]}>
        <View style={styles.headerContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.textIconAlign}>
              <View style={styles.deleteButton}>
                <Icon
                  size={20} 
                  name = {
                    Platform.OS === 'android' ? 'md-pin' : 'ios-pin'
                  }
                  color='#70C1B3' />
                </View>
              <Text 
                style={styles.placeName}>
                {this.props.selectedPlace.name}
              </Text>
            </View>
            <View style={styles.textIconAlign}>
              <TouchableOpacity onPress={this.placeDeleteHandler}>
                <View style={styles.deleteButton}>
                  <Icon
                    size={20} 
                    name={Platform.OS === 'android' ? 'md-close-circle-outline' : 'ios-close-circle-outline'} 
                    color='#F25F5C' />
                </View>
              </TouchableOpacity>
              <Text 
                style={styles.placeName}>
                Delete
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
              <Image 
                source={this.props.selectedPlace.image} 
                style={styles.placeImage} />
          </View>
          <View style={styles.subContainer}>
            <MapView 
              style={styles.map}
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get('window').width /
                  Dimensions.get('window').height *
                  0.0122
              }}>
              <MapView.Marker 
                coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'column',
  },
  placeDetailContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#efefef',
    paddingTop: 10,
    paddingBottom: 10,
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#50514F'
  },
  delete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#F25F5C'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: 'center',
    paddingRight: 5
  },
  subContainer: {
    flex: 1,
  },
  textIconAlign: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(actions.deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);