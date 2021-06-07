import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill'; // Typescript
import { useHistory } from 'react-router-dom';
import './WriteComponent.scss';
import LoaderImg from 'src/styles/images/loaders/placeholder.svg';
// import parse from 'html-react-parser';
import { getCookie } from 'src/lib/cookieFunction';
import axios from 'axios';
const WriteComponent = () => {
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
  useEffect(() => {
    if (quillRef.current) {
      const imgCheckRegex: any = new RegExp('data:image/([a-zA-Z]*);base64,([^"]*)', 'g');
      const base64ImgString = quillRef?.current?.getEditor().root.innerHTML.match(imgCheckRegex);
      const asyncWrite = async () => {
        if (imageHtmlCheck.current === true) {
          const base64Img = dataURLtoFile(base64ImgString, `base64 + ${new Date()}`);
          const file = base64Img;
          const formData = new FormData();
          formData.append('files', file);
          const range = quillRef?.current?.getEditor().selection.savedRange;
          const res: any = await apiPostNewsImage(formData);
          quillRef?.current?.getEditor().deleteText(range.index, 1);
          quillRef?.current?.getEditor().insertEmbed(range.index, 'image', res.data);
          imageHtmlCheck.current = false;
        }
      };
      if (base64ImgString) {
        imageHtmlCheck.current = true;
        asyncWrite();
      }
      if (!imageHtmlCheck.current) {
        quillRef?.current?.getEditor().on('text-change', () => {
          setHtmlContent(quillRef?.current?.getEditor().root.innerHTML);
        });
      }
    }
  }, [quillRef?.current?.getEditor()?.root.innerHTML]);

  const history = useHistory();
  return (
    <div className="write-style">
      <ReactQuill
        theme="snow"
        ref={quillRef}
        value={htmlContent}
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
      <div className="write-style__btnBox">
        <button type="button" className="goBackBtn" onClick={() => history.goBack()}>
          취소
        </button>
        <button type="button" className="submitBtn" onClick={() => history.goBack()}>
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteComponent;
