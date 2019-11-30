import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {fadeIn} from 'react-navigation-transitions';

import Home from './screens/Home/Home';
import NewActivity from './screens/NewActivity/NewActivity';

import Settings from './screens/Settings/Settings';
import TabBar from './components/TabBar/TabBar';

import {withTheme} from 'styled-components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StackHome = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    NewActivity: {
      screen: NewActivity,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    transitionConfig: () => fadeIn(),
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: StackHome,
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
