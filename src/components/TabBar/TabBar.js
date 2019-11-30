import React from 'react';
import {BottomTabBar} from 'react-navigation-tabs';

const TabBar = props => {
  const {screenProps} = props;

  return (
    <BottomTabBar
      {...props}
      inactiveBackgroundColor={screenProps.theme.INACTIVE_COLOR}
      activeBackgroundColor={screenProps.theme.ACTIVE_COLOR}
      showLabel={false}
      getLabelText={({route}) => route.key.toUpperCase()}
    />
  );
};

export default TabBar;
