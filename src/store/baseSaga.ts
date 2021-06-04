import { call, put } from 'redux-saga/effects';

import { apiFetch } from 'src/lib/api';

interface IFetchData {
  payload: any;
  successAction?: (...args: any[]) => any;
  failureAction?: (...args: any[]) => any;
}

export function* fetchData({ payload, successAction, failureAction }: IFetchData) {
  try {
    let res = call(apiFetch, payload);
    res = yield res;
    // console.log({ res }, 'baseSaga res');
    if (res && successAction) {
      yield call(successAction(res));
    } else if (!res && failureAction) {
      yield call(failureAction(res));
    }
  } catch (e) {
    console.log({ e });

    yield put({
      type: 'modal/showModal',
      payload: {
        modalName: 'alert',
        modalTitle: '에러',
        modalContent: JSON.stringify(e?.response?.data) || '잠시 후 다시 시도해주세요',
      },
    });

    // if (e.response.status === 401) {
    //   // token 만료
    //   yield put({
    //     type: 'login/tokenRefershRequest',
    //     payload: {
    //       method: 'post',
    //       api: 'tokenRefresh',
    //       token: localStorage.getItem('refresh'),
    //     },
    //   });
    //   console.log({ payload });
    // }
    if (failureAction) {
      yield call(failureAction(e));
    }
  }
}
