import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { listRequest, getPostRequest, deletePostRequest, HooksBoard } from 'src/store/board/boardSlice';
// import parse from 'html-react-parser';
import { getCookie } from 'src/lib/cookieFunction';
import jwtDecode from 'jwt-decode';
import './PostComponent.scss';
import DOMPurify from 'dompurify';

const PostComponent = () => {
  const match: any = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostRequest({ method: 'get', api: 'board', id: match?.params?.id, token: getCookie('access') }));
  }, [match?.params?.id]);
  const { currentPost } = HooksBoard();

  const history = useHistory();
  const createMarkup = () => {
    return { __html: DOMPurify.sanitize(currentPost?.text) };
  };
  const getList = () => {
    dispatch(listRequest({ method: 'get', api: 'board', token: getCookie('access') }));
  };
  const onDelete = () => {
    dispatch(
      deletePostRequest({
        method: 'delete',
        api: 'deletePost',
        id: match?.params?.id,
        token: getCookie('access'),
        callback: () => {
          getList();
          history.push('/board');
        },
      }),
    );
  };

  const [accountId, setAccountId] = useState('');
  useEffect(() => {
    const decodedHeader: any = jwtDecode(getCookie('access'));
    setAccountId(decodedHeader?.user_id);
  }, []);

  return (
    <div className="post-style">
      <div className="post-style__titleBox">
        <span className="number">{currentPost?.id || ''}</span>
        <span className="title">{currentPost?.title || ''}</span>
        <span className="username"> by {currentPost?.username || ''}</span>
      </div>
      <div className="post-style__htmlBox">
        <p dangerouslySetInnerHTML={createMarkup()} />
      </div>
      <div className="post-style__btnBox">
        {accountId === currentPost?.userId && (
          <>
            <button
              type="button"
              className="updateBtn"
              onClick={() => history.push(`/board/update/${currentPost?.id}`)}
            >
              수정
            </button>
            <button type="button" className="deleteBtn" onClick={onDelete}>
              삭제
            </button>
          </>
        )}
        <button type="button" className="goBackBtn" onClick={() => history.push('/board')}>
          목록
        </button>
      </div>
    </div>
  );
};

export default PostComponent;
