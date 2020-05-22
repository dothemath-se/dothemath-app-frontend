import React, { useState, useEffect } from 'react';
import * as api from '../../api';

interface SubjectListProps {
  onComplete: (arg0: { name: string; id: string }) => void;
}

export const SubjectList = (props: SubjectListProps) => {
  const [subjects, setSubjects] = useState([] as api.Subject[]);
  useEffect(() => api.getSubjects(setSubjects), []);

  return (
    <div id="popup">
      <div id="subjects-container">
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
  );
};
