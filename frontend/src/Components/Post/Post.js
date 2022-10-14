import { useRecoilState } from 'recoil';
import { userWalletAddressState } from '../../atoms';
import { useState } from 'react';
import { createDir, uploadPostQuestion } from '../../Helpers/ipfs';

function Post() {
  const [author, setAuthor] = useRecoilState(userWalletAddressState);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [timestamp, setTimestamp] = useState();

  const onTitleHandler = (e) => {
    setTitle(e.target.value);
    setTimestamp(Date.now());
    console.log(title);
  };
  const onContentHandler = (e) => {
    setContent(e.target.value);
    setTimestamp(Date.now());
    console.log(content);
  };

  const onPost = async (e) => {
    const postInfo = JSON.stringify({
      author,
      timestamp,
      title,
      content,
    });

    if (!title || !content) {
      console.log('모든 항목을 다 입력해주십시오.');
      // upload the post
    } else {
      console.log(postInfo);
      await createDir(author);
      await uploadPostQuestion(author, postInfo);
    }
  };

  return (
    <div className="Post">
      <div className="post">
        <form>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-body"
                id="title"
                name="title"
                value={title}
                onChange={onTitleHandler}
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="content" className="col-sm-2 col-form-label">
              Content
            </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control form-body form-content"
                id="content"
                name="content"
                value={content}
                onChange={onContentHandler}
              ></textarea>
            </div>
          </div>
        </form>

        <button
          onClick={onPost}
          className="btn btn-post bg-dark btn-outline-light btn-lg px-5 text-white "
        >
          Post Question
        </button>
      </div>
    </div>
  );
}

export default Post;
