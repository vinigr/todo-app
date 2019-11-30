import React, {useContext, useState, useEffect} from 'react';
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

  const handleTheme = color => {
    if (color === 'light') {
      AsyncStorage.setItem(STORAGE_KEY, 'light');
      setTheme('light');
    } else {
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

export function withTheme(Component) {
  return props => {
    const {theme, setTheme} = useContext(ThemeContext);

    const getTheme = theme;
    const handleTheme = () => {
      if (theme === 'light') {
        AsyncStorage.setItem(STORAGE_KEY, 'dark');
        setTheme('dark');
      } else {
        AsyncStorage.setItem(STORAGE_KEY, 'light');
        setTheme('light');
      }
    };

    return (
      <Component {...props} theme={getTheme(theme)} setTheme={handleTheme} />
    );
  };
}
