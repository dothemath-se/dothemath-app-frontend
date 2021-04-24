import React from 'react';

interface LoadingIndicatorProps {
  loading?: boolean;
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  if (!props.loading) return null;
  return (
    <div className="popup">
      <div className="registration-and-subjects-container">
        <h3>Laddar...</h3>
      </div>
    </div>
  );
};
