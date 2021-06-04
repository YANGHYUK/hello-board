import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, useAppSelector } from 'src/store';

interface SignupState {
  loading: boolean;
  data: { isLogin: boolean };
  error: string;
}
// Define the initial state using that type
const initialState: SignupState = {
  loading: false,
  data: { isLogin: false },
  error: '',
};

export interface IsignupRequest {
  method: string;
  api: string;
  data: { username: string; email: string; password: string };
  autoLogin?: boolean;
  callback?: (() => void | undefined) | undefined;
}
export interface IsignupRequestSuccess {
  body: { locationName: string; authToken: string };
}
export interface IlogoutRequest {
  method: string;
  api: string;
  callback?: (() => void | undefined) | undefined;
}
export type AuthActionType = PayloadAction<IsignupRequest> | PayloadAction<IlogoutRequest>;

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupRequest: (state, _: PayloadAction<IsignupRequest>) => {
      state.loading = true;
      state.error = '';
    },
    signupRequestSuccess: (state, action: PayloadAction<IsignupRequestSuccess>) => {
      console.log({ action }, '809890');
      state.loading = false;
      state.data.isLogin = true;

      state.error = '';
    },
    signupRequestFailure: (state, action: any) => {
      state.loading = false;
      state.data.isLogin = false;
      state.error = '에러';
    },
  },
});

export const { signupRequest } = signupSlice.actions;

export function HooksSignup() {
  const { isLogin, loading, error } = useAppSelector((state: RootState) => ({
    isLogin: state.signup.data.isLogin,
    loading: state.signup.loading,
    error: state.signup.error,
  }));

  return {
    isLogin,
    loading,
    error,
  };
}

export default signupSlice.reducer;
