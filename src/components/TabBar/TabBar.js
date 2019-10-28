import React from 'react';
import {BottomTabBar} from 'react-navigation-tabs';

import {withTheme} from '../../core/ThemeProvider';

const TabBar = props => {
  return (
    <BottomTabBar
      {...props}
      activeTintColor={props.theme.color}
      inactiveBackgroundColor={props.theme.inativeColor}
      activeBackgroundColor={props.theme.backgroundColor}
      showLabel={false}
      getLabelText={({route}) => route.key.toUpperCase()}
    />
  );
};

export default withTheme(TabBar);
