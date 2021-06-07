import React, { useEffect } from 'react';
import { Route, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { listRequest, HooksBoard } from 'src/store/board/boardSlice';
import { HooksLogin, tokenRefreshRequest, logoutRequest } from 'src/store/login/loginSlice';
import { getCookie } from 'src/lib/cookieFunction';
import './BoardComponent.scss';
import Post from './Post';
import Update from './Update';
import Write from './Write';

const BoardComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin } = HooksLogin();
  useEffect(() => {
    if (isLogin) {
      if (history.location.pathname === '/') {
        history.replace('/board');
      }
      dispatch(listRequest({ method: 'get', api: 'board', token: getCookie('access') }));
    }
  }, [isLogin]);

  const onLogout = () => {
    dispatch(
      logoutRequest({
        method: 'post',
        api: 'logout',
        data: { refresh: localStorage.getItem('refresh') || '' },
      }),
    );
    history.push('/login');
  };

  const { list, loading } = HooksBoard();
  if (loading) {
    return <div className="board-style">loading...</div>;
  }

  return (
    <div className="board-style">
      <div className="board-style__header">
        {isLogin && (
          <button className="logoutBtn" type="button" onClick={onLogout}>
            로그아웃
          </button>
        )}
      </div>
      <Route exact path={['/', '/board/post', '/board/post/:id']}>
        <Post />
      </Route>
      <Route exact path={['/board/update/:id']}>
        <Update />
      </Route>
      <Route exact path={['/board/write']}>
        <Write />
      </Route>

      <table className="board-style__list">
        <thead>
          <tr>
            <th>no</th>
            <th>제목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {list.length ? (
            list.map((content: { id: number; title: string; text: string }) => (
              <tr key={content.id}>
                <td>{content.id}</td>
                <td>{content.title}</td>
                <td>{content.text}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>&lsquo; 컨텐츠 없음 &lsquo;</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="board-style__btnBox">
        {history.location.pathname === '/board' && (
          <button className="postBtn" type="button" onClick={() => history.push('/board/write')}>
            글쓰기
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardComponent;
