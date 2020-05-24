import { useDebugValue } from 'react';
import { useCookies } from 'react-cookie';

export const useCookie = <T>(cookieName: string): [T, (value: T) => void] => {
  const [cookies, setCookie] = useCookies([cookieName]);
  useDebugValue(`${cookieName}: ${cookies[cookieName]}`);
  return [
    cookies[cookieName],
    (value: T) =>
      setCookie(cookieName, value, { path: '/', maxAge: 30 * 24 * 60 * 60 }),
  ];
};
