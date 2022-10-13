import { useRecoilState } from 'recoil';
import { contentState, titleState, authorState } from "../atoms";
import Axios from "axios";


function Post() {

  const [author, setAuthor] = useRecoilState(authorState);
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);


  const onTitleHandler = (e) => {
      setTitle(e.target.value);
  }
  const onContentHandler = (e) => {
      setContent(e.target.value);
  }

  const onPost = () => {

    setAuthor(sessionStorage.getItem('user_id'));
    
      const postInfo = {
          title,
          content,
          author
      }

      var hasEmptyInfo = false;

      for(var i in postInfo){
          if(!postInfo[i])
          hasEmptyInfo = true;
      }

      if(hasEmptyInfo){
          console.log('모든 항목을 다 입력해주십시오.');
      }

      else{
          console.log(postInfo);
          Axios.post("http://localhost:8000/post/question", postInfo)
          .then((res)=>{
              console.log(res);
              document.location.href = `/`
          })
          .catch((e)=>{
              console.error(e);
          });
      };
  }

  return (
    <div className="Post">
        <div class = "post">
        <form>
            <div class="form-group row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                <input type="text" readonly class="form-control form-body" id="title" name="title"
                 value={title} onChange={onTitleHandler}></input>
                </div>
            </div>

            <div class="form-group row">
                <label for="content" class="col-sm-2 col-form-label">Content</label>
                <div class="col-sm-10">
                <input type="text" readonly class="form-control form-body form-content" id="content" name="content"
                 value={content} onChange={onContentHandler}></input>
                </div>
            </div>
        </form>

        <button onClick={onPost} class="btn btn-post bg-dark btn-outline-light btn-lg px-5 text-white ">Go to Question!</button>
        </div>
     </div>

  );
}

export default Post;