import React from 'react';
import './CheckModalComponent.scss';
import { hideModal, HooksModal } from 'src/store/modal/modalSlice';
export default function CheckModalComponent() {
  const { check, modalTitle, modalContent, modalCheckCallback, dispatch } = HooksModal();
  if (!check) {
    return null;
  }

  const hideModalFunc = () => {
    dispatch(
      hideModal({
        modalName: 'check',
      }),
    );
  };
  const modalCheckCallbackFunc = () => {
    if (modalCheckCallback) {
      modalCheckCallback();
    }
    hideModalFunc();
  };

  return (
    <div className="checkModal-style">
      <div className="checkModal-style__modalBox">
        <button className="closeButton" type="button" onClick={hideModalFunc}>
          &times;
        </button>
        <div className="checkModal-style__modalBox__propsBox">
          <div className="title">{modalTitle}</div>
          <div className="content">{modalContent}</div>
        </div>
        <div className="checkModal-style__modalBox__buttonBox">
          <button type="button" onClick={hideModalFunc}>
            취소
          </button>
          <button type="button" onClick={modalCheckCallbackFunc}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
