import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RootState,
  useAppSelector,
  //  useAppDispatch
} from 'src/store';

interface LoginState {
  loading: boolean;
  data: { isLogin: boolean };
  error: string;
}
// Define the initial state using that type
const initialState: LoginState = {
  loading: false,
  data: { isLogin: false },
  error: '',
};

export interface IloginRequest {
  method: string;
  api: string;
  data: { email: string; password: string };
  autoLogin?: boolean;
  callback?: (() => void | undefined) | undefined;
}
export interface IloginRequestSuccess {
  access: string;
  refresh: string;
}

export interface IlogoutRequest {
  method: string;
  api: string;
  data: { refresh: string };
  callback?: (() => void | undefined) | undefined;
}
export type AuthActionType = PayloadAction<IloginRequest> | PayloadAction<IlogoutRequest>;

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state, _: PayloadAction<IloginRequest>) => {
      state.loading = true;
      state.error = '';
    },
    loginRequestSuccess: (state, _: PayloadAction<IloginRequestSuccess>) => {
      state.loading = false;
      state.data.isLogin = true;
      state.error = '';
    },
    loginRequestFailure: (state) => {
      state.loading = false;
      state.data.isLogin = false;
      state.error = '에러';
    },
    tokenRefreshRequest: (state, _action: any) => {
      state.error = '';
    },
    tokenRefreshRequestSuccess: (state, _: any) => {
      state.data.isLogin = true;
    },
    tokenRefreshRequestFailure: (state, _: any) => {
      state.data.isLogin = false;
    },
    logoutRequest: (state, _: PayloadAction<IlogoutRequest>) => {
      state.loading = false;
      state.data.isLogin = false;
    },
    logoutRequestSuccess: (state) => {
      state.loading = false;
      state.data.isLogin = false;
    },
    logoutRequestFailure: (state) => {
      state.loading = false;
      state.data.isLogin = false;
    },
  },
});

export const { loginRequest, logoutRequest, tokenRefreshRequest } = loginSlice.actions;

export function HooksLogin() {
  const { isLogin, loading, error } = useAppSelector((state: RootState) => ({
    isLogin: state.login.data.isLogin,
    loading: state.login.loading,
    error: state.login.error,
  }));
  // const dispatch = useAppDispatch();
  return {
    isLogin,
    loading,
    error,
    // dispatch,
  };
}

export default loginSlice.reducer;
