import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useTheme} from '../core/ThemeProvider';
import {light, dark} from '../styles/theme';
import TabNavigator from './Tab';

const Routes = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer
      theme={{dark: theme === 'dark', colors: theme === 'dark' ? dark : light}}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Routes;
