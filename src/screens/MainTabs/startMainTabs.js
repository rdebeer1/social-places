import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'social-places.FindPlaceScreen',
                    label: 'Find Place',
                    title: 'Find Place',
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: 'sideDrawerToggle'
                            }
                        ]
                    }
                },
                {
                    screen: 'social-places.SharePlaceScreen',
                    label: 'Share Place',
                    title: 'Share Place',
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: 'sideDrawerToggle'
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: '#F25F5C',
                tabBarTextFontFamily: 'OperatorMonoSSm-Medium',
                tabBarBackgroundColor: 'white'
            },
            appStyle: {
                tabBarSelectedButtonColor: '#F25F5C',
                tabFontFamily: 'OperatorMonoSSm-Book',
                tabBarBackgroundColor: 'white'
            },
            drawer: {
                left: {
                    screen: 'social-places.SideDrawerScreen'
                }
            }
        });
    });
};

export default startTabs;