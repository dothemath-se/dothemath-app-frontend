import './index.sass';

import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import GitInfo from 'react-git-info/macro';
import { MemoryRouter } from 'react-router-dom';

import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';

const version = GitInfo().commit.shortHash;
console.info(`running version ${version}`);

Sentry.init({
  dsn:
    'https://a63d74f600b4405fb2c93587717194ce@o376267.ingest.sentry.io/5196889',
  release: version,
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
