import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

export class ErrorBoundary extends Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = { eventId: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
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

    return this.props.children;
  }
}
