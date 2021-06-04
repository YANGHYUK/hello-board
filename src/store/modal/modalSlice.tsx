import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, useAppSelector, useAppDispatch } from 'src/store';

interface ModalState {
  //   [key: string]: any;
  // modalName: keyof ModalState|'';
  modalName: string | '';
  // modalName: null|undefined|'alert'|'check'|'modalContent'|'modalTitle'|'modalStyle'|'modalCheckCallback'|'modalCancelCallback';
  data: {
    alert: boolean;

    check: boolean;
    content: any[];
    modalContent: any;
    modalTitle: string;
    modalStyle: string;
    modalSubmitCallback: () => void;
    modalCheckCallback: () => void;
    modalCancelCallback: () => void;
  };
}

const initialState: ModalState = {
  modalName: '',
  data: {
    alert: false,

    check: false,
    content: [],
    modalContent: '',
    modalTitle: '',
    modalStyle: '',
    modalSubmitCallback: () => {},
    modalCheckCallback: () => {},
    modalCancelCallback: () => {},
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state: any, action: PayloadAction<any>) => {
      const {
        modalName,
        modalContent,
        modalStyle,
        modalTitle,
        modalSubmitCallback,
        modalCheckCallback,
        modalCancelCallback,
      } = action.payload;

      switch (modalName) {
        case 'content':
          state.data[modalName].push({
            id: state.data[modalName].length,
            modalContent,
            modalStyle,
            modalTitle,
            modalCheckCallback,
            modalSubmitCallback,
            modalCancelCallback,
          });
          break;
        default:
          state.data[modalName] = true;
          state.data.modalContent = modalContent;
          state.data.modalStyle = modalStyle;
          state.data.modalTitle = modalTitle;
          state.data.modalSubmitCallback = modalSubmitCallback;
          state.data.modalCheckCallback = modalCheckCallback;
          state.data.modalCancelCallback = modalCancelCallback;
          break;
      }
    },
    hideModal: (state: any, action: PayloadAction<any>) => {
      const { modalName, id }: any = action.payload;
      switch (modalName) {
        case 'content':
          if (id) {
            const index = state.data[modalName].findIndex((item: any) => item.id === id);
            state.data[modalName].splice(index, 1);
          } else {
            state.data[modalName] = [];
          }
          break;
        default:
          state.data[modalName] = false;
          state.data.modalContent = null;
          state.data.modalStyle = 'blueGradientStyle';
          state.data.modalTitle = 'Wait!';
          state.data.modalSubmitCallback = null;
          state.data.modalCheckCallback = null;
          state.data.modalCancelCallback = null;
          break;
      }
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export function HooksModal() {
  const {
    alert,

    check,
    content,
    modalStyle,
    modalTitle,
    modalContent,
    modalSubmitCallback,
    modalCheckCallback,
    modalCancelCallback,
  } = useAppSelector((state: RootState) => ({
    alert: state.modal.data.alert,

    check: state.modal.data.check,
    content: state.modal.data.content,
    modalStyle: state.modal.data.modalStyle,
    modalTitle: state.modal.data.modalTitle,
    modalContent: state.modal.data.modalContent,
    modalSubmitCallback: state.modal.data.modalSubmitCallback,
    modalCheckCallback: state.modal.data.modalCheckCallback,
    modalCancelCallback: state.modal.data.modalCancelCallback,
  }));
  const dispatch = useAppDispatch();
  return {
    alert,
    check,
    content,
    modalStyle,
    modalTitle,
    modalContent,
    modalSubmitCallback,
    modalCheckCallback,
    modalCancelCallback,
    dispatch,
  };
}

export default modalSlice.reducer;
