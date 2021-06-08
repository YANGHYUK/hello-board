import axios, { AxiosResponse } from 'axios';
// import { authEncode } from 'src/lib/authenEncodeFunction';
import { setCookie } from 'src/lib/cookieFunction';
const BASENAME = 'http://192.168.0.12:8000';
// process.env.REACT_APP_PRO_API_URL;
// process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PRO_API_URL;
// process.env.REACT_APP_PRO_API_URL;
// process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PRO_API_URL;

const path: any = {
  //manager단
  signup: 'api/user/signup',
  login: 'api/user/signin',
  logout: 'api/user/logout',
  board: 'api/post',
  tokenRefresh: 'api/token/refresh',
  tempImage: 'api/post/image',
  writePost: 'api/post',
  updatePost: 'api/post',
};

interface Iinfo {
  base: string | '';
  method: any;
  api: string | '';
  id: string;
  params: any;
  data: any;
  token: string;
  contentType: string;
}

function callApi({ ...info }: Iinfo) {
  const {
    base = '',
    method = '',
    api = '',
    id = '',
    params = {},
    data = {},
    token = '',
    contentType = 'application/json',
  } = info;
  const API_HEAD = base || BASENAME;

  const url = id ? `${API_HEAD}/${path[api]}/${id}` : `${API_HEAD}/${path[api]}`;

  axios.defaults.withCredentials = true;
  return axios({
    method,
    url,
    data,
    params,
    headers: {
      'Content-Type': contentType,
      Authorization: `JWT ${token}`,
    },
    timeout: 4000,
  });
}

export async function apiFetch({ ...data }: Iinfo): Promise<AxiosResponse<any>> {
  const savedData = data;
  try {
    const res: any = await callApi({ ...data });
    return res;
  } catch (e) {
    if (e.response.status === 401) {
      // 401이란것은 토큰이 만료되었다는 이야기 고로 refresh 토큰을 이용해서 갱신해야함.
      const dataSet: any = {
        base: '',
        method: '',
        api: '',
        id: '',
        params: {},
        data: {},
        token: '',
        contentType: 'application/json',
      };
      const refreshResponse = await callApi({
        // 토큰 갱신
        ...dataSet,
        method: 'post',
        api: 'tokenRefresh',
        data: { refresh: localStorage.getItem('refresh') },
      });
      const { access, refresh } = refreshResponse.data;
      if (access) setCookie('access', access);
      if (refresh) localStorage.setItem('refresh', refresh);

      const res = await callApi({
        // 기존에 실패했던 요청에 새로운 token을 씌워서 다시 요청 한다.
        ...savedData,
        token: access,
      });
      return res;
    }
    return e;
  }
}
