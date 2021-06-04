import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; // saga
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { rootReducer, rootSaga } from 'src/store/rootStore';

// Saga Middleware 생성
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
