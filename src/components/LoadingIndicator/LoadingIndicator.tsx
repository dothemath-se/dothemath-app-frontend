import React from 'react';

interface LoadingIndicatorProps {
  loading?: boolean;
}

export function LoadingIndicator(props: LoadingIndicatorProps) {
  if (!props.loading) return null;
  return (
    <div id="popup">
      <div id="popup-container">
        <h3>Loading...</h3>
      </div>
    </div>
  );
}
