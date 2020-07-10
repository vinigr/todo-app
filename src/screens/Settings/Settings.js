import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Titulo,
  TextTheme,
  ButtonTheme,
  OptionsTheme,
} from './styles';

import {useTheme} from '../../core/ThemeProvider';

const Settings = ({screenProps}) => {
  const themeToggle = useTheme();

  const {handleTheme} = themeToggle;

  return (
    <Container>
      <Titulo>Tema</Titulo>
      <OptionsTheme>
        <ButtonTheme color="#121212" onPress={() => handleTheme('dark')}>
          <Icon
            color="#D8DEE9"
            style={style.icon}
            size={30}
            name="weather-night"
          />
          <TextTheme color="#D8DEE9">Dark</TextTheme>
        </ButtonTheme>
        <ButtonTheme color="#fff" onPress={() => handleTheme('light')}>
          <Icon
            color="#000"
            style={style.icon}
            size={30}
            name="white-balance-sunny"
          />
          <TextTheme color="#000">Light</TextTheme>
        </ButtonTheme>
      </OptionsTheme>
    </Container>
  );
};

const style = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
});

export default Settings;
