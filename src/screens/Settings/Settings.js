import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {withTheme} from '../../core/ThemeProvider';

const Settings = ({theme}) => {
  return (
    <View style={[style.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[style.text, {color: theme.color}]}>SETTINGS</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default withTheme(Settings);
