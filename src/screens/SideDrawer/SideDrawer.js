import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
//actions
import * as actions from '../../store/actions/index';
//icons
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
  render() {
    return (
      <View 
        style={[
          styles.container, 
          {width: Dimensions.get('window').width * 0.8}
          ]}>
        <TouchableOpacity
          onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon 
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color='#bbb'
              style={styles.drawerItemIcon} />
            <Text style={styles.signOutText}>
              sign out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: 'white',
    flex: 1
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee'
  },
  drawerItemIcon: {
    marginRight: 10
  },
  signOutText: {
    fontFamily: 'OperatorMonoSSm-MediumItalic',
    letterSpacing: -1,
    color: '#247BA0'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(SideDrawer);