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
  const [imageOnChange, setImageOnChange] = useState(false);
  const handleChange =
    //  useCallback(
    async (html: any) => {
      const quill = quillRef.current.getEditor();
      console.log({ html });
      if (html) {
        const imgCheckRegex: any = new RegExp('data:image/([a-zA-Z]*);base64,([^"]*)', 'g');
        if (imgCheckRegex.exec(html)) {
          const base64ImgString = html.match(imgCheckRegex);
          if (base64ImgString && base64ImgString.length) {
            setImageOnChange(true);
            const base64Img = dataURLtoFile(base64ImgString, `base64 + ${new Date()}`);
            const file = base64Img;
            const formData = new FormData();
            formData.append('files', file);

            // Save current cursor state
            const range = quill.selection.savedRange;

            const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
            if (imageOnChange === false) {
              quill.insertEmbed(range.index, 'image', res.data);
            }
          }
        }
        // quill.root.innerHTML = html;

        return setHtmlContent(html);
        // quill.root.innerHTML = html;
      }
    };
  // , []);
  // const dispatch = useDispatch();
  const apiPostNewsImage = (formData: any) => {
    return axios({
      method: 'post',
      url: 'http://192.168.0.12:8000/api/post/image',
      data: formData,
      headers: { Authorization: `JWT ${getCookie('access')}`, 'Content-Type': 'multipart/form-data' },
    });
  };

  const imageHandler = () => {
    const input: any = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      const formData = new FormData();

      formData.append('files', file);

      // Save current cursor state
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();

      // Insert temporary loading placeholder image
      console.log(quill.insertEmbed, '12830981092093');
      console.log('range.index:', range.index);
      quill.insertEmbed(range.index, 'image', LoaderImg);

      // Move cursor to right side of image (easier to continue typing)
      quill.setSelection(range.index + 1);

      // console.log(JSON.stri formData }, 222222);

      const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      quill.deleteText(range.index, 1);

      // Insert uploaded image
      // quill.insertEmbed(range.index, 'image', res.body.image);
      console.log({ res });
      quill.insertEmbed(range.index, 'image', res.data);
    };
  };
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.root.innerHTML = htmlContent;
      quill.on('text-change', () => {
        console.log('hi');
        setHtmlContent(quill.root.innerHTML);
      });
    }
  }, [quillRef?.current]);

  const history = useHistory();
  return (
    <div className="write-style">
      {/* {JSON.stringify(htmlContent)} */}
      <ReactQuill
        theme="snow"
        ref={quillRef}
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
