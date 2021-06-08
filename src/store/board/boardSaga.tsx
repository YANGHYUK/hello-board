import { all, put, fork, takeLatest } from 'redux-saga/effects';
import { fetchData } from 'src/store/baseSaga';
import { setCookie } from 'src/lib/cookieFunction';

import { PayloadAction } from '@reduxjs/toolkit';
import { IlistRequest, IlistRequestSuccess, IwriteRequest } from './boardSlice';

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
// export function* postTempImageRequest(action: PayloadAction<IwriteRequest>) {
//   const { payload } = action;
//   const { callback } = payload;
//   const successAction = (res: any) =>
//     function* noname() {
//       const payload = res.data;
//       yield put({
//         type: 'board/postTempImageRequestSuccess',
//         payload,
//       });
//       if (callback) {
//         yield callback(); // history.push("/")
//       }
//     };
//   const failureAction = (res: any) =>
//     function* noname() {
//       const payload = res.data;

//       yield put({
//         type: 'board/postTempImageRequestFailure',
//         payload,
//       });
//       if (callback) {
//         yield callback(); // history.push("/")
//       }
//     };
//   yield fork(fetchData, { payload, successAction, failureAction });
// }

export function* writeRequest(action: PayloadAction<IwriteRequest>) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/writeRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback(); //
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/writeRequestFailure',
        payload,
      });
      if (callback) {
        yield callback(); // history.push("/")
      }
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export function* getPostRequest(action: any) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/getPostRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback(); //
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/getPostRequestFailure',
        payload,
      });
      if (callback) {
        yield callback(); // history.push("/")
      }
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export function* updatePostRequest(action: any) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/updatePostRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback(); //
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/updatePostRequestFailure',
        payload,
      });
      if (callback) {
        yield callback(); // history.push("/")
      }
    };
  yield fork(fetchData, { payload, successAction, failureAction });
}

export function* deletePostRequest(action: any) {
  const { payload } = action;
  const { callback } = payload;
  const successAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/deletePostRequestSuccess',
        payload,
      });
      if (callback) {
        yield callback(); //
      }
    };
  const failureAction = (res: any) =>
    function* noname() {
      const payload = res.data;

      yield put({
        type: 'board/deletePostRequestFailure',
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
    // takeLatest('board/postTempImageRequest', postTempImageRequest),
    takeLatest('board/writeRequest', writeRequest),
    takeLatest('board/getPostRequest', getPostRequest),
    takeLatest('board/updatePostRequest', updatePostRequest),
    takeLatest('board/deletePostRequest', deletePostRequest),
  ]);
}
