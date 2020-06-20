import React from 'react';
import { useAsyncResource } from 'use-async-resource';

import { Subject } from '../../api/api';
import * as api from '../../api/api';
import { Button } from '../Button';
import { ErrorBoundary } from '../ErrorBoundary';
import { LoadingIndicator } from '../LoadingIndicator';
import styles from './SubjectList.module.sass';

interface SubjectListProps {
  onComplete: (arg0: { name: string; id: string }) => void;
}

export const SubjectList = (props: SubjectListProps) => {
  const [subjectsReader] = useAsyncResource(api.getSubjects, []);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingIndicator loading />}>
        <SuspendableSubjectList subjectsReader={subjectsReader} {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

interface SuspendableSubjectListProps extends SubjectListProps {
  subjectsReader: () => Subject[];
}

const SuspendableSubjectList = (props: SuspendableSubjectListProps) => {
  const subjects = props.subjectsReader();

  return (
    <div id="popup">
      <div
        className={`${styles['subjects-container']} registration-and-subjects-container`}
      >
        <h2>Välj ämne</h2>
        {subjects.map((item) => (
          <Button primary key={item.id} onClick={() => props.onComplete(item)}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
