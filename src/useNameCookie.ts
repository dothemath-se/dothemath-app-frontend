import { useCookies } from "react-cookie";

export function useNameCookie() {
  const cookieName = "name";
  const [cookies, setCookie] = useCookies([cookieName]);
  return [
    cookies[cookieName],
    (name) => setCookie(cookieName, name, { path: "/" }),
  ];
}
