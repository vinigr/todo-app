import React, {useEffect} from 'react';

import {ThemeContextProvider} from './core/ThemeProvider';
import Navigator from './Navigator';

export default function App() {
  return (
    <ThemeContextProvider>
      <Navigator />
    </ThemeContextProvider>
  );
}
