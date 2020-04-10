import { useCookies } from 'react-cookie';

export function useCookie(cookieName: string) {
  const [cookies, setCookie] = useCookies([cookieName]);
  return [
    cookies[cookieName],
    (name) => setCookie(cookieName, name, { path: '/' }),
  ];
}
