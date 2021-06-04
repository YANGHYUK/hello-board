import React from 'react';
import './SignupComponent.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModal } from 'src/store/modal/modalSlice';
import { signupRequest, HooksSignup } from 'src/store/signup/signupSlice';
const SignupComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = e.target as HTMLFormElement;
    let errorMessage = '';
    if (!username.value || !email.value || !password.value) {
      if (!username.value) errorMessage = '이름을 입력해주세요';
      if (!email.value) errorMessage = '이메일을 입력해주세요';
      if (!password.value) errorMessage = '비밀번호를 입력해주세요';
      return dispatch(showModal({ modalName: 'alert', modalTitle: '알림', modalContent: errorMessage }));
    }
    return dispatch(
      signupRequest({
        method: 'post',
        api: 'signup',
        data: {
          username: username.value,
          email: email.value,
          password: password.value,
        },

        callback: () => history.push('/login'),
      }),
    );
  };
  return (
    <form className="signup-style" onSubmit={onSubmit}>
      <div>회원가입</div>
      <input placeholder="이름" name="username" />
      <input placeholder="이메일" name="email" />
      <input placeholder="비밀번호" name="password" />
      <button type="submit">확인</button>
      <div className="sinupNavBox">
        <span onClick={() => history.push('/login')}> 로그인 </span>
      </div>
    </form>
  );
};

export default SignupComponent;
