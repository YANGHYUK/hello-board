import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RootState,
  useAppSelector,
  //  useAppDispatch
} from 'src/store';

interface boardState {
  loading: boolean;
  data: any;
  error: string;
}
// Define the initial state using that type
const initialState: boardState = {
  loading: false,
  data: { list: [] },
  error: '',
};

export interface IlistRequest {
  method: string;
  api: string;
  token: string;
  callback?: (() => void | undefined) | undefined;
}
export interface IlistRequestSuccess {
  access: string;
  refresh: string;
}

export interface IpostRequest {
  method: string;
  api: string;
  callback?: (() => void | undefined) | undefined;
}
export type boardActionType = PayloadAction<IlistRequest> | PayloadAction<IlistRequestSuccess>;

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    listRequest: (state, _: PayloadAction<IlistRequest>) => {
      state.loading = true;
      state.error = '';
    },
    listRequestSuccess: (state, action: any) => {
      state.loading = false;
      state.data.list = action.payload;

      state.error = '';
    },
    listRequestFailure: (state) => {
      state.loading = false;

      state.error = '에러';
    },

    postTempImageRequest: (state, _) => {},
    postTempImageRequestSuccess: () => {},
    postTempImageRequestFailure: () => {},

    postRequest: (state, _: PayloadAction<IpostRequest>) => {
      state.loading = false;
    },
    postRequestSuccess: (state, action: any) => {
      state.loading = false;
    },
    postRequestFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { listRequest, postTempImageRequest, postRequest } = boardSlice.actions;

export function HooksBoard() {
  const { loading, error, list } = useAppSelector((state: RootState) => ({
    loading: state.board.loading,
    error: state.board.error,
    list: state.board.data.list,
  }));
  // const dispatch = useAppDispatch();
  return {
    loading,
    error,
    list,
    // dispatch,
  };
}

export default boardSlice.reducer;
