import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Typescript
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPostRequest, updatePostRequest, HooksBoard } from 'src/store/board/boardSlice';
import { getCookie } from 'src/lib/cookieFunction';
import './UpdateComponent.scss';

const UpdateComponent = () => {
  const { currentPost } = HooksBoard();
  useEffect(() => {
    // dispatch(getPostRequest({ method: 'get', api: 'board', id: match?.params?.id }));
    if (!currentPost) {
      history.goBack();
    }
  }, []);

  const [title, setTitle] = useState(currentPost?.title || '');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target || '';
    setTitle(value);
  };

  const [htmlContent, setHtmlContent] = useState(currentPost?.text || '');
  const quill: any = useRef(null);
  const handleChange = (html: any) => {
    setHtmlContent(html);
  };
  const apiPostNewsImage = (images: any) => {
    // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
  };

  const imageHandler = () => {
    const input: any = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append('image', file);

      // Save current cursor state
      const range = quill.getSelection(true);

      // Insert temporary loading placeholder image
      quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

      // Move cursor to right side of image (easier to continue typing)
      quill.setSelection(range.index + 1);

      const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      quill.deleteText(range.index, 1);

      // Insert uploaded image
      // quill.insertEmbed(range.index, 'image', res.body.image);
      quill.insertEmbed(range.index, 'image', res);
    };
  };
  const history = useHistory();

  const dispatch = useDispatch();
  const getPost = () => {
    dispatch(getPostRequest({ method: 'get', api: 'board', id: currentPost.id }));
  };
  const onSubmit = () => {
    dispatch(
      updatePostRequest({
        method: 'put',
        api: 'updatePost',
        data: { title, text: htmlContent },
        token: getCookie('access'),
        id: currentPost?.id,
        callback: () => {
          getPost();
          history.goBack();
        },
      }),
    );
  };
  return (
    <div className="update-style">
      <div className="update-style__titleBox">
        <input className="title" value={title} placeholder="제목을 입력해주세요" onChange={onChangeTitle} />
      </div>
      <div className="update-style__contentBox">
        <ReactQuill
          theme="snow"
          ref={quill}
          // defaultValue={currentPost?.text}
          value={htmlContent || ''}
          onChange={handleChange}
          modules={{
            toolbar: {
              container: [
                [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'video'],
                ['link', 'image', 'video'],
                ['clean'],
                ['code-block'],
              ],
              handlers: {
                image: imageHandler,
              },
            },
          }}
        />
      </div>
      <div className="update-style__btnBox">
        <button type="button" className="goBackBtn" onClick={() => history.goBack()}>
          취소
        </button>
        <button type="button" className="submitBtn" onClick={onSubmit}>
          수정
        </button>
      </div>
    </div>
  );
};

export default UpdateComponent;
