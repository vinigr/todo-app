import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import TabBar from './components/TabBar/TabBar';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Settings,
  },
  {
    tabBarComponent: props => <TabBar {...props} />,
  },
);

export default createAppContainer(TabNavigator);
