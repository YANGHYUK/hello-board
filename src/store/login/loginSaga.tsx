import { all, put, fork, takeLatest } from 'redux-saga/effects';
import { fetchData } from 'src/store/baseSaga';
import { setCookie, removeCookie } from 'src/lib/cookieFunction';

import { PayloadAction } from '@reduxjs/toolkit';
import { IloginRequest, IloginRequestSuccess, IlogoutRequest } from './loginSlice';

export function* loginRequest(action: PayloadAction<IloginRequest>) {
  const { payload } = action;
  const { callback } = payload;

  const successAction = (res: any) =>
    function* noname() {
      const payload: IloginRequestSuccess = res.data;

      const { refresh, access } = payload;
      if (access) setCookie('access', access);
      if (refresh) localStorage.setItem('refresh', refresh);
      yield put({
        type: 'login/loginRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback();
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      // console.log('failure!!!!!');
      const payload = res.data;
      yield put({
        type: 'login/loginRequestFailure',
        payload,
      });
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export function* tokenRefreshRequest(action: any) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      const payload: any = res.data;
      const { refresh, access } = payload;
      if (access) setCookie('access', access);
      if (refresh) localStorage.setItem('refresh', refresh);
      yield put({
        type: 'login/tokenRefreshRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback();
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      // console.log('failure!!!!!');
      const payload = res.data;
      yield put({
        type: 'login/tokenRefreshRequestFailure',
        payload,
      });
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export function* logoutRequest(action: PayloadAction<IlogoutRequest>) {
  const { payload } = action;
  // const { callback } = payload;
  removeCookie('access');
  localStorage.removeItem('refresh');
  const successAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'login/logoutRequestSuccess',
        payload,
      });
      // if (callback) {
      // yield callback(); // history.push("/")
      // }
    };
  const failureAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'login/logoutRequestFailure',
        payload,
      });
      // if (callback) {
      // yield callback(); // history.push("/")
      // }
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export default function* watcherLoginSaga() {
  yield all([
    takeLatest('login/loginRequest', loginRequest),
    takeLatest('login/tokenRefreshRequest', tokenRefreshRequest),
    takeLatest('login/logoutRequest', logoutRequest),
  ]);
}
