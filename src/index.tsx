import './tailwind.css';
import './index.sass';

import * as Sentry from '@sentry/react';
import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import { App } from './components/App';

Sentry.init({
  dsn: 'https://a63d74f600b4405fb2c93587717194ce@o376267.ingest.sentry.io/5196889',
});

ReactDOM.render(
  <StrictMode>
    <Sentry.ErrorBoundary
      showDialog={true}
      dialogOptions={{
        name: 'DoTheMath.app user',
        email: 'you.dont.have.to.enter.anything@here.now',
      }}
    >
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Sentry.ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);
