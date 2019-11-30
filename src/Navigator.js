import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import TabBar from './components/TabBar/TabBar';

import {withTheme} from 'styled-components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({screenProps}) => ({
        tabBarIcon: (
          <Icon color={screenProps.theme.TEXT_COLOR} size={30} name="home" />
        ),
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({screenProps}) => ({
        tabBarIcon: (
          <Icon
            color={screenProps.theme.TEXT_COLOR}
            size={30}
            name="settings"
          />
        ),
      }),
    },
  },
  {
    tabBarComponent: props => <TabBar {...props} />,
  },
);

const Routes = createAppContainer(TabNavigator);

export default withTheme(({theme}) => {
  return <Routes screenProps={{theme}} />;
});
