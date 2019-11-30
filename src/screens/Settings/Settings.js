import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Titulo, Text, ButtonTheme} from './styles';

import {useTheme} from '../../core/ThemeProvider';

const Settings = ({screenProps}) => {
  const themeToggle = useTheme();

  const {handleTheme} = themeToggle;

  return (
    <Container>
      <Titulo>Tema</Titulo>
      <ButtonTheme onPress={() => handleTheme('dark')}>
        <Icon
          color={screenProps.theme.TEXT_COLOR}
          style={style.icon}
          size={30}
          name="weather-night"
        />
        <Text>Dark</Text>
      </ButtonTheme>
      <ButtonTheme onPress={() => handleTheme('light')}>
        <Icon
          color={screenProps.theme.TEXT_COLOR}
          style={style.icon}
          size={30}
          name="white-balance-sunny"
        />
        <Text>Light</Text>
      </ButtonTheme>
    </Container>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default Settings;
