import { Link } from 'react-router-dom';
import { useEffect} from 'react'
import { useRecoilState } from 'recoil';
import { isLoginState } from "../atoms";
import Axios from "axios";

function Header() {

  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
 
  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }

  }, [setIsLogin])

  const onLogout = () => {

    Axios.get("http://localhost:8000/logout", null)
        .then((res)=>{ 
          sessionStorage.removeItem('user_id')
          document.location.href = '/'
        })
        .catch((e)=>{
            console.log(e);
        });
  
  }

  return (
    <div className="Header">
    <header class="p-3 text-bg-dark">
        <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
         

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <Link to="/" style={{ textDecoration: 'none' }}><li class="px-2 text-white">QnA For Everyone</li></Link>
            </ul>

            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
            </form>

            <div class="text-end">
          
            {isLogin ? (
                <button type="button" onClick={onLogout} class="btn btn-outline-light me-2">Logout</button>
       
            ) : (
                <Link to="/login"><button type="button" class="btn btn-outline-light me-2">Login</button></Link>
            )}

            {isLogin ? (
                <Link to="/mypage"><button type="button" class="btn btn-outline-light me-2">My Page</button></Link>
                
       
            ) : (
                <Link to="/register"><button type="button" class="btn btn-outline-light me-2">Register</button></Link>
            )}

            {isLogin &&
            <Link to="/post"><button type="button" class="btn btn-outline-light me-2">Go Question</button></Link>}


            
            </div>
        </div>
        </div>
    </header>
    </div>
  );
}

export default Header;
