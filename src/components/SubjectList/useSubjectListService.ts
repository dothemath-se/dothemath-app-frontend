import { useAsyncEffect } from 'use-async-effect';

import { Subject } from '../../api/api';
import * as api from '../../api/api4';
import { useNamedState } from '../../useNamedState';

export function useSubjectListService(): [Subject[], boolean] {
  const [subjects, setSubjects] = useNamedState([] as Subject[], 'subjects');

  const [loading, setLoading] = useNamedState(false, 'loading');

  useAsyncEffect(async () => {
    setLoading(true);

    console.log('go');
    const p = api.getSubjects();
    console.log('p', p);
    const result = await p;
    console.log('went');
    console.log('p', p);
    console.log('result', result);
    console.log('gone');

    setSubjects(result);
    setLoading(false);
  }, []);

  return [subjects, loading];
}
