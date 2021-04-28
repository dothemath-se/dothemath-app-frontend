import * as Sentry from '@sentry/browser';
import React, { Component, ErrorInfo, PropsWithChildren } from 'react';

import { Button } from '../Button';

export class ErrorBoundary extends Component<PropsWithChildren<{}>> {
  state: any;

  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { eventId: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch?(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras((errorInfo as unknown) as Record<string, unknown>);
      const eventId = Sentry.captureException(error);
      console.log(`Error reported to Sentry with eventId '${eventId}':`, error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Button
          primary
          onClick={() =>
            Sentry.showReportDialog({ eventId: this.state.eventId })
          }
        >
          Berätta vad som gick fel
        </Button>
      );
    }

    return this.props.children;
  }
}
