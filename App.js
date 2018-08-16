import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  'social-places.AuthScreen', 
  () => AuthScreen, 
  store, 
  Provider
);
Navigation.registerComponent(
  'social-places.SharePlaceScreen',
  () => SharePlaceScreen, 
  store, 
  Provider
);
Navigation.registerComponent(
  'social-places.FindPlaceScreen',
  () => FindPlaceScreen, 
  store, 
  Provider
);

Navigation.registerComponent(
  'social-places.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'social-places.SideDrawerScreen',
  () => SideDrawerScreen,
  store,
  Provider
);

// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'social-places.AuthScreen',
    title: 'Login'
  }
});
