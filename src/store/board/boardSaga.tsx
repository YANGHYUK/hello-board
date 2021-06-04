import { all, put, fork, takeLatest } from 'redux-saga/effects';
import { fetchData } from 'src/store/baseSaga';
import { setCookie, removeCookie } from 'src/lib/cookieFunction';

import { PayloadAction } from '@reduxjs/toolkit';
import { IlistRequest, IlistRequestSuccess, IpostRequest } from './boardSlice';

export function* listRequest(action: PayloadAction<IlistRequest>) {
  const { payload } = action;
  const { callback } = payload;

  const successAction = (res: any) =>
    function* noname() {
      const payload: IlistRequestSuccess = res.data;

      const { refresh, access } = payload;
      if (access) setCookie('access', access);
      if (refresh) localStorage.setItem('refresh', refresh);
      yield put({
        type: 'board/listRequestSuccess',
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
        type: 'board/listRequestFailure',
        payload,
      });
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}
export function* postTempImageRequest(action: PayloadAction<IpostRequest>) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/postTempImageRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback(); // history.push("/")
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/postTempImageRequestFailure',
        payload,
      });
      if (callback) {
        yield callback(); // history.push("/")
      }
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export function* postRequest(action: PayloadAction<IpostRequest>) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/postRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback(); // history.push("/")
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/postRequestFailure',
        payload,
      });
      if (callback) {
        yield callback(); // history.push("/")
      }
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export default function* watcherBoardSaga() {
  yield all([
    takeLatest('board/listRequest', listRequest),
    takeLatest('board/postTempImageRequest', postTempImageRequest),
    takeLatest('board/postRequest', postRequest),
  ]);
}
