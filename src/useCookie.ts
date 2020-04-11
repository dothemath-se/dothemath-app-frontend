import { useCookies } from 'react-cookie';
import { useDebugValue } from 'react';

export function useCookie(cookieName: string) {
  const [cookies, setCookie] = useCookies([cookieName]);
  useDebugValue(`${cookieName}: ${cookies[cookieName]}`);
  return [
    cookies[cookieName],
    (value: string) => setCookie(cookieName, value, { path: '/' }),
  ];
}
