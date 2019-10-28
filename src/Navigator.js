import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import TabBar from './components/TabBar/TabBar';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} size={30} name="home" />
        ),
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} size={30} name="settings" />
        ),
      },
    },
  },
  {
    tabBarComponent: props => <TabBar {...props} />,
  },
);

export default createAppContainer(TabNavigator);
