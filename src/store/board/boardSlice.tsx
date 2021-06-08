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
  data: { list: [], currentPost: null },
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

export interface IwriteRequest {
  method: string;
  api: string;
  data: { title: string; text: string };
  token: string;
  history: any;
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
    writeRequest: (state, _action: PayloadAction<IwriteRequest>) => {
      state.loading = false;
    },
    writeRequestSuccess: (state, action: any) => {
      state.loading = false;
    },
    writeRequestFailure: (state) => {
      state.loading = false;
    },
    getPostRequest: (state, _) => {},
    getPostRequestSuccess: (state, action: any) => {
      state.data.currentPost = action.payload;
    },
    getPostRequestFailure: (state, _) => {},

    updatePostRequest: (state, _) => {},
    updatePostRequestSuccess: (state, action: any) => {
      state.data.currentPost = action.payload;
    },
    updatePostRequestFailure: (state, _) => {},

    deletePostRequest: (state, _) => {},
    deletePostRequestSuccess: (state, action: any) => {
      state.data.currentPost = action.payload;
    },
    deletePostRequestFailure: (state, _) => {},
    // postTempImageRequest: (state, _) => {},
    // postTempImageRequestSuccess: () => {},
    // postTempImageRequestFailure: () => {},
  },
});

export const {
  listRequest,
  writeRequest,
  getPostRequest,
  updatePostRequest,
  deletePostRequest,
  //  postTempImageRequest
} = boardSlice.actions;

export function HooksBoard() {
  const { loading, error, list, currentPost } = useAppSelector((state: RootState) => ({
    loading: state.board.loading,
    error: state.board.error,
    list: state.board.data.list,
    currentPost: state.board.data.currentPost,
  }));
  // const dispatch = useAppDispatch();
  return {
    loading,
    error,
    list,
    currentPost,
    // dispatch,
  };
}

export default boardSlice.reducer;
