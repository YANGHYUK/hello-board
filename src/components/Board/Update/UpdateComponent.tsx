import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill'; // Typescript
import { useHistory } from 'react-router-dom';
import './UpdateComponent.scss';
const UpdateComponent = () => {
  const [htmlContent, setHtmlContent] = useState(null);
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
  return (
    <div className="update-style">
      {JSON.stringify(htmlContent)}
      <ReactQuill
        theme="snow"
        ref={quill}
        // value={htmlContent}
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
      <div className="update-style__btnBox">
        <button type="button" className="goBackBtn" onClick={() => history.goBack()}>
          취소
        </button>
        <button type="button" className="submitBtn" onClick={() => history.goBack()}>
          수정
        </button>
      </div>
    </div>
  );
};

export default UpdateComponent;
