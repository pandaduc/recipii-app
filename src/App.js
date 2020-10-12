import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Main } from './components/Main'

function App() {

  return (
    <ThemeProvider>
      <CSSReset />
      <Main />
    </ThemeProvider>
  );
}

export default App;
