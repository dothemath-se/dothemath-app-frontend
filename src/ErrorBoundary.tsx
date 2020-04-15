import React, { Component, ErrorInfo } from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
  state: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { eventId: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      console.log(`Error reported to Sentry with eventId '${eventId}':`, error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <button
          onClick={() =>
            Sentry.showReportDialog({ eventId: this.state.eventId })
          }
        >
          Report feedback
        </button>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
