import { all, put, fork, takeLatest } from 'redux-saga/effects';
import { fetchData } from 'src/store/baseSaga';
import { setCookie, removeCookie } from 'src/lib/cookieFunction';
// import { setSession, removeSession } from 'src/lib/sessionFunction';
import { PayloadAction } from '@reduxjs/toolkit';
import { IsignupRequest, IsignupRequestSuccess } from './signupSlice';

export function* loginRequest(action: PayloadAction<IsignupRequest>) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      // console.log('success!!!!!');
      const payload: IsignupRequestSuccess = res.data;
      yield put({
        type: 'signup/signupRequestSuccess',
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
        type: 'signup/signupRequestFailure',
        payload,
      });
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export default function* watcherSignupSaga() {
  yield all([takeLatest('signup/signupRequest', loginRequest)]);
}
