import React from 'react';
import { CssBaseline } from '@mui/material';
import AppRouter from './Router';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
};

export default App;
