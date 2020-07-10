import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home/Home';
import NewActivity from '../screens/NewActivity/NewActivity';
import Activity from '../screens/Activity/Activity';

const Stack = createStackNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewActivity" component={NewActivity} />
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
};

export default StackHome;
