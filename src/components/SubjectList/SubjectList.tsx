import React from 'react';

import { LoadingIndicator } from '../LoadingIndicator';
import { useSubjectListService } from './useSubjectListService';

interface SubjectListProps {
  onComplete: (arg0: { name: string; id: string }) => void;
}

export const SubjectList = (props: SubjectListProps) => {
  const [subjects, loading] = useSubjectListService();

  return (
    <>
      {!loading && (
        <div id="popup">
          <div id="subjects-container" className="popup-and-subjects-container">
            <h2>Välj ämne</h2>
            {subjects.map((item) => (
              <button
                className="btn--primary"
                key={item.id}
                onClick={() => props.onComplete(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <LoadingIndicator loading={loading} />
    </>
  );
};
