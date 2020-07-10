import React, {useContext, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {ThemeProvider} from 'styled-components';

import {light, dark} from '../styles/theme';

const STORAGE_KEY = 'THEME_ID';

export const ThemeContext = React.createContext();

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (!data) {
        setTheme('light');
        await AsyncStorage.setItem(STORAGE_KEY, 'light');
      } else {
        setTheme(data);
      }
    })();
  }, []);

  const handleTheme = (color) => {
    if (color === 'light') {
      console.log('teste');
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(light.background);
      AsyncStorage.setItem(STORAGE_KEY, 'light');

      setTheme('light');
    } else {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(dark.background);

      AsyncStorage.setItem(STORAGE_KEY, 'dark');
      setTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{theme, handleTheme}}>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
