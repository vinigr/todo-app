import React, {useContext, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {ThemeProvider} from 'styled-components';

import {light, dark} from '../styles/theme';

const STORAGE_KEY = 'THEME_ID';

export const ThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (!data) {
        AsyncStorage.setItem(STORAGE_KEY, 'light');
      }

      if (theme === 'light') {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(light.background);
      } else {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor(dark.background);

        setTheme(data);
      }
    })();
  }, [theme]);

  const handleTheme = async (color) => {
    if (color === 'light') {
      setTheme('light');
      await AsyncStorage.setItem(STORAGE_KEY, 'light');
    } else {
      setTheme('dark');
      await AsyncStorage.setItem(STORAGE_KEY, 'dark');
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
