import React, { useEffect, useRef } from 'react';
import './AlertModalComponent.scss';
import { hideModal, HooksModal } from 'src/store/modal/modalSlice';
export default function AlertModalComponent() {
  const { alert, modalTitle, modalContent, dispatch } = HooksModal();

  const hideModalFunc = () => {
    dispatch(
      hideModal({
        modalName: 'alert',
      }),
    );
  };
  const handleUserKeyPress = () => {
    if (hideModalFunc) {
      hideModalFunc();
    }
  };

  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, []);

  if (!alert) {
    return null;
  }

  return (
    <form className="alertModal-style" onSubmit={hideModalFunc} ref={ref} onKeyPress={handleUserKeyPress}>
      <div className="alertModal-style__modalBox">
        <button className="closeButton" type="button" onClick={hideModalFunc}>
          &times;
        </button>
        <div className="alertModal-style__modalBox__propsBox">
          <div className="title">{modalTitle}</div>
          <div className="content">{modalContent}</div>
        </div>
        <div className="checkModal-style__modalBox__buttonBox">
          <button type="submit">확인</button>
        </div>
      </div>
    </form>
  );
}
