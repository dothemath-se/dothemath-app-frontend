import { useAsyncEffect } from 'use-async-effect';

import * as api from '../../api';
import { useNamedState } from '../../useNamedState';

export function useSubjectListService(): [api.Subject[], boolean] {
  const [subjects, setSubjects] = useNamedState(
    [] as api.Subject[],
    'subjects'
  );

  const [loading, setLoading] = useNamedState(false, 'loading');

  useAsyncEffect(async () => {
    setLoading(true);
    const result = await api.getSubjects();
    setSubjects(result);
    setLoading(false);
  }, []);

  return [subjects, loading];
}
