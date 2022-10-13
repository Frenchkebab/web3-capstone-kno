import { useRecoilState } from 'recoil';
import { usernameState, passwordState } from "../atoms";
import { Link } from 'react-router-dom';
import Axios from "axios";

function Login() {
    const [username, setUsername] = useRecoilState (usernameState);
    const [password, setPassword] = useRecoilState (passwordState); 
    
    const onUsernameHandler = (e) => {
      setUsername(e.target.value);
  }

  const onPasswordHandler = (e) => {
      setPassword(e.target.value);
  }
  
  const onLogin = () => {

    const userInfo = {
        username,
        password
    }

    var hasEmptyInfo = false;

    for(var i in userInfo){
        if(!userInfo[i])
        hasEmptyInfo = true;
    }

    if(hasEmptyInfo){
        console.log('모든 항목을 다 입력해주십시오.');
    }
    else{
        console.log(userInfo);
        Axios.post("http://localhost:8000/login", userInfo)
        .then((res)=>{ 
            if(res.data === 'login success')
            {
                sessionStorage.setItem('user_id', username);
                document.location.href = '/'
            }else
            {
                alert(res.data);
                document.location.href = '/login'
            }
            
        })
        .catch((e)=>{
            console.error(e);
        });
    };
}



  return (
    <div className="Login">
      <section class="vh-100 gradient-custom body">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-white text-black">
                <div class="card-body p-5 text-center">

                    <div class="mb-md-5 mt-md-4 pb-5">
                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                        <p class="text-gray-50 mb-5">Please enter your ID and password!</p>

                        <div class="form-outline form-white mb-4">
                            <input type="text" id="username" name="username" placeholder="Username" 
                            value={username} onChange={onUsernameHandler} class="form-control form-control-lg" />        
                        </div>

                        <div class="form-outline form-white mb-4">
                            <input type="password" id="password" name="password" placeholder="Password"     
                            value={password} onChange={onPasswordHandler} class="form-control form-control-lg" />             
                        </div>

                        <Link to="/">
                            <button type="submit" onClick={onLogin} class="btn bg-dark btn-outline-light btn-lg px-5">Login</button>
                        </Link>

                    </div>

                    <p class="mb-0">Don't you have account?</p><Link to="/register" class = "text-black">Register!</Link>
     
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
     </div>

  );
}

export default Login;