import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { getPostRequest, deletePostRequest, HooksBoard } from 'src/store/board/boardSlice';
// import parse from 'html-react-parser';
import './PostComponent.scss';
import DOMPurify from 'dompurify';

const PostComponent = () => {
  const match: any = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostRequest({ method: 'get', api: 'board', id: match?.params?.id }));
  }, [match?.params?.id]);
  const { currentPost } = HooksBoard();

  const history = useHistory();
  const createMarkup = () => {
    return { __html: DOMPurify.sanitize(currentPost?.text) };
  };

  const onDelete = () => {
    dispatch(deletePostRequest({ method: 'delete', api: 'deletePost', id: match?.params?.id }));
  };

  return (
    <div className="post-style">
      <div className="post-style__titleBox">
        <span className="number">{currentPost?.id || ''}</span>
        <span className="title">{currentPost?.title || ''}</span>
      </div>
      <div className="post-style__htmlBox">
        <p dangerouslySetInnerHTML={createMarkup()} />
      </div>
      <div className="post-style__btnBox">
        {currentPost?.userId && (
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
