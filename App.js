import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";

// Register Screens
Navigation.registerComponent("social-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("social-places.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("social-places.FindPlaceScreen", () => FindPlaceScreen);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "social-places.AuthScreen",
    title: "Login"
  }
});