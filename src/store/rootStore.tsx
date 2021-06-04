import { combineReducers } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';

// import mainSlice from 'src/store/main/mainSlice';
// import mainSaga from 'src/store/main/mainSaga';

// import emailValidationSlice from 'src/store/emailValidation/emailValidationSlice';
// import emailValidationSaga from 'src/store/emailValidation/emailValidationSaga';

// import authSlice from 'src/store/auth/authSlice';
// import authSaga from 'src/store/auth/authSaga';

// import usageStatusSlice from 'src/store/usageStatus/usageStatusSlice';
// import usageStatusSaga from 'src/store/usageStatus/usageStatusSaga';

// import approvalSlice from 'src/store/approval/approvalSlice';
// import approvalSaga from 'src/store/approval/approvalSaga';

// import contractSlice from 'src/store/contract/contractSlice';
// import contractSaga from 'src/store/contract/contractSaga';

// import noticeSlice from 'src/store/notice/noticeSlice';
// import noticeSaga from 'src/store/notice/noticeSaga';

// import houseNewsSlice from 'src/store/houseNews/houseNewsSlice';
// import houseNewsSaga from 'src/store/houseNews/houseNewsSaga';

// import userHouseNewsSlice from 'src/store/userHouseNews/userHouseNewsSlice';
// import userHouseNewsSaga from 'src/store/userHouseNews/userHouseNewsSaga';

// import userNotiSlice from 'src/store/userNoti/userNotiSlice';
// import userNotiSaga from 'src/store/userNoti/userNotiSaga';

// import userServiceCenterFAQSlice from 'src/store/userServiceCenter/FAQ/faqSlice';
// import userSercieCenterFAQSaga from 'src/store/userServiceCenter/FAQ/faqSaga';

import modalSlice from 'src/store/modal/modalSlice';

import signupSlice from 'src/store/signup/signupSlice';
import signupSaga from 'src/store/signup/signupSaga';

import loginSlice from 'src/store/login/loginSlice';
import loginSaga from 'src/store/login/loginSaga';

import boardSlice from 'src/store/board/boardSlice';
import boardSaga from 'src/store/board/boardSaga';

// //toolkit
export const rootReducer = combineReducers({
  modal: modalSlice,
  signup: signupSlice,
  login: loginSlice,
  board: boardSlice,
  // login: loginSlice,
  //   auth: authSlice,
  //   usageStatus: usageStatusSlice,
  //   approval: approvalSlice,
  //   contract: contractSlice,
  //   main: mainSlice,
  //   notice: noticeSlice,
  //   houseNews: houseNewsSlice,
  //   userHouseNews: userHouseNewsSlice,
  //   userNoti: userNotiSlice,
  //   emailValidation: emailValidationSlice,
  //   userServiceCenterFAQ: userServiceCenterFAQSlice,
});

//saga
export function* rootSaga() {
  yield all([
    signupSaga(),
    loginSaga(),
    boardSaga(),
    // mainSaga(),
    // authSaga(),
    // usageStatusSaga(),
    // approvalSaga(),
    // userNotiSaga(),
    // noticeSaga(),
    // houseNewsSaga(),
    // emailValidationSaga(),
    // contractSaga(),
    // userHouseNewsSaga(),
    // userSercieCenterFAQSaga(),
  ]);
}
