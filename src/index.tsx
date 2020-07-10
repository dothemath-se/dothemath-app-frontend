import './index.sass';

import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import { App } from './components/App';
// import { ErrorBoundary } from './components/ErrorBoundary';
import { SentryErrorBoundary } from './components/SentryErrorBoundary';

Sentry.init({
  dsn:
    'https://a63d74f600b4405fb2c93587717194ce@o376267.ingest.sentry.io/5196889',
});

ReactDOM.render(
  <React.StrictMode>
    <SentryErrorBoundary>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </SentryErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
