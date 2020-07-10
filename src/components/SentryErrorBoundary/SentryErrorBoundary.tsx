import * as Sentry from '@sentry/browser';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '../Button';

export const SentryErrorBoundary = (props: PropsWithChildren<{}>) => {
  const [eventId, setEventId] = useState('');

  const ErrorFallback = () => {
    useEffect(() => {
      Sentry.showReportDialog({
        eventId: eventId,
        lang: 'sv',
      });
    }, []);
    return <Button>Ladda om appen</Button>;
  };

  const myErrorHandler = (error: Error, componentStack: string) => {
    Sentry.withScope((scope) => {
      scope.setExtras({ componentStack });
      const eventId = Sentry.captureException(error);
      console.log(`Error reported to Sentry with eventId '${eventId}':`, error);
      setEventId(eventId);
    });
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {props.children}
    </ErrorBoundary>
  );
};
