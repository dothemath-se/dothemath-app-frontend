import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { App } from './App';

export default {
  title: 'App',
};

export const Default = () => (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);
