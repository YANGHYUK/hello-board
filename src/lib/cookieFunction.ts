import Cookies from 'universal-cookie';

export const setCookie = (key: string, value: string) => {
  const cookies = new Cookies();
  cookies.set(key, value, { path: '/' });
};

export const getCookie = (key: string) => {
  const cookies = new Cookies();
  const savedCookie = cookies.get(key);
  return savedCookie;
};

export const removeCookie = (key: string) => {
  const cookies = new Cookies();
  cookies.remove(key);
};
