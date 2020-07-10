import React from 'react';

import {ThemeContextProvider} from './core/ThemeProvider';
import Navigator from './routes/Navigator';

export default function App() {
  return (
    <ThemeContextProvider>
      <Navigator />
    </ThemeContextProvider>
  );
}
