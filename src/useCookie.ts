import { useCookies } from 'react-cookie';
import { useDebugValue } from 'react';

export const useCookie = <T>(cookieName: string): [T, (value: T) => void] => {
  const [cookies, setCookie] = useCookies([cookieName]);
  useDebugValue(`${cookieName}: ${cookies[cookieName]}`);
  return [
    cookies[cookieName],
    (value: T) =>
      setCookie(cookieName, value, { path: '/', maxAge: 30 * 24 * 60 * 60 }),
  ];
};
