import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill'; // Typescript
import { useHistory } from 'react-router-dom';
import './WriteComponent.scss';
// import LoaderImg from 'src/styles/images/loaders/placeholder.svg';
// import parse from 'html-react-parser';
import { getCookie } from 'src/lib/cookieFunction';
import axios from 'axios';
import { writeRequest } from 'src/store/board/boardSlice';
const WriteComponent = (props: any) => {
  const [title, setTitle] = useState('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target || '';
    setTitle(value);
  };

  const [htmlContent, setHtmlContent] = useState('');
  const quillRef: any = useRef(null);

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr: any = dataurl[0].split(',');
    const mime: any = arr[0].match(/:(.*?);/)[1];
    const bstr: any = atob(arr[1]);
    let n: number = bstr.length;
    const u8arr: any = new Uint8Array(n);

    while (n >= 0) {
      u8arr[n] = bstr.charCodeAt(n);
      n = n - 1;
    }

    return new File([u8arr], filename, { type: mime });
  };

  const apiPostNewsImage = (formData: any) => {
    return axios({
      method: 'post',
      url: 'http://192.168.0.12:8000/api/post/image',
      data: formData,
      headers: { Authorization: `JWT ${getCookie('access')}`, 'Content-Type': 'multipart/form-data' },
    });
  };

  const imageHtmlCheck = useRef(false);
  const onChangeHtml = () => {
    const imgCheckRegex: any = new RegExp('data:image/([a-zA-Z]*);base64,([^"]*)', 'g');
    const base64ImgString = quillRef?.current?.getEditor().root.innerHTML.match(imgCheckRegex);
    const asyncWrite = async () => {
      if (imageHtmlCheck.current === true) {
        imageHtmlCheck.current = false;
        const base64Img = dataURLtoFile(base64ImgString, `base64 + ${new Date()}`);
        const file = base64Img;
        const formData = new FormData();
        formData.append('files', file);
        const range = quillRef?.current?.getEditor().selection.savedRange;
        const res: any = await apiPostNewsImage(formData);
        quillRef?.current?.getEditor().deleteText(range.index, 1);
        quillRef?.current?.getEditor().insertEmbed(range.index, 'image', res.data);
      }
    };
    if (base64ImgString) {
      imageHtmlCheck.current = true;
      asyncWrite();
    }
    if (imageHtmlCheck.current === false) {
      setHtmlContent(quillRef?.current?.getEditor().root.innerHTML);
    }
  };

  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      writeRequest({
        method: 'post',
        api: 'writePost',
        data: { title, text: htmlContent },
        token: getCookie('access'),
        callback: () => {
          props.getList();
          history.goBack();
        },
      }),
    );
  };
  return (
    <div className="write-style">
      <div className="write-style__titleBox">
        <input className="title" value={title} placeholder="제목을 입력해주세요" onChange={onChangeTitle} />
      </div>
      <div className="write-style__contentBox">
        <ReactQuill
          theme="snow"
          ref={quillRef}
          value={htmlContent}
          onChange={onChangeHtml}
          modules={{
            toolbar: {
              container: [
                [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
                ['code-block'],
              ],
            },
          }}
        />
      </div>
      <div className="write-style__btnBox">
        <button type="button" className="goBackBtn" onClick={() => history.goBack()}>
          취소
        </button>
        <button type="button" className="submitBtn" onClick={onSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteComponent;
