import { useEffect } from 'react';
import * as api from '../../api';
import { useNamedState } from '../../useNamedState';

export function useSubjectListService(): [api.Subject[], boolean] {
  const [subjects, setSubjects] = useNamedState(
    [] as api.Subject[],
    'subjects'
  );

  const [loading, setLoading] = useNamedState(false, 'loading');

  useEffect(() => {
    setLoading(true);
    api.getSubjects(async (s) => {
      setSubjects(s);
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [subjects, loading];
}
