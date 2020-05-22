import React from 'react';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'App',
};

export const Default = () => (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);
