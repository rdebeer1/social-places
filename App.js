import { Navigation } from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth'

//Register Screens 
Navigation.registerComponent('social-places.AuthScreen', () => AuthScreen);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'social-places.AuthScreen'
      }
    }
  });
});