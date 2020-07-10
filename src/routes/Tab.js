import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Settings from '../screens/Settings/Settings';
import {useTheme} from '@react-navigation/native';

import StackHome from './Stack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: colors.INACTIVE_COLOR,
        inactiveBackgroundColor: colors.INACTIVE_COLOR,
        keyboardHidesTabBar: true,
        activeTintColor: '#2F8AD9',
        inactiveTintColor: '#646464',
      }}>
      <Tab.Screen
        name="Home"
        component={StackHome}
        options={{tabBarIcon: () => <Icon size={30} name="home" />}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
          tabBarIcon: () => <Icon size={30} name="settings" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
