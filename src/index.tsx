import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import './index.sass';
import * as Sentry from '@sentry/browser';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MemoryRouter } from 'react-router-dom';

Sentry.init({
  dsn:
    'https://a63d74f600b4405fb2c93587717194ce@o376267.ingest.sentry.io/5196889',
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
