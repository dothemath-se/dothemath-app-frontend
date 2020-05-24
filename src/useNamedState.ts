import { Dispatch, SetStateAction, useDebugValue, useState } from 'react';

export function useNamedState<S>(
  initialState: S | (() => S),
  name: string
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  useDebugValue(`${name}: ${state}`);
  return [state, setState];
}
