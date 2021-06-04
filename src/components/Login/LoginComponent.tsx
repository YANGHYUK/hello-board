import React from 'react';
import './LoginComponent.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModal } from 'src/store/modal/modalSlice';
import { loginRequest, HooksLogin } from 'src/store/login/loginSlice';
const LoginComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target as HTMLFormElement;
    if (!email.value) {
      return dispatch(
        showModal({
          modalName: 'alert',
          modalTitle: '에러',
          modalContent: '아이디를 입력해주세요',
        }),
      );
    }
    if (!password.value) {
      return dispatch(
        showModal({
          modalName: 'alert',
          modalTitle: '에러',
          modalContent: '비밀번호를 입력해주세요',
        }),
      );
    }
    return dispatch(
      loginRequest({
        method: 'post',
        api: 'login',
        data: {
          email: email.value,
          password: password.value,
        },
        callback: () => history.push('/board'),
      }),
    );
  };
  return (
    <form className="login-style" onSubmit={onSubmit}>
      <div>로그인</div>
      <input placeholder="이메일" name="email" />
      <input placeholder="비밀번호" name="password" />
      <button type="submit">확인</button>
      <div className="loginNavBox">
        <span onClick={() => history.push('/signup')}> 회원가입 </span>
      </div>
    </form>
  );
};

export default LoginComponent;
