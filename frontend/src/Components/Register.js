import { useRecoilState } from 'recoil';
import { usernameState, passwordState, confirmPasswordState } from '../atoms';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Register() {
  const [username, setUsername] = useRecoilState(usernameState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [confirmPassword, setConfirmPassword] =
    useRecoilState(confirmPasswordState);

  const onUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onRegister = () => {
    const userInfo = {
      username,
      password,
    };

    var hasEmptyInfo = false;

    for (var i in userInfo) {
      if (!userInfo[i]) hasEmptyInfo = true;
    }

    if (hasEmptyInfo) {
      alert('모든 항목을 다 입력해주십시오.');
    } else if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호확인이 일치하지 않습니다.');
    } else {
      console.log(userInfo);
      Axios.post('http://localhost:8000/register', userInfo)
        .then((res) => {
          console.log(res);
          document.location.href = '/connect';
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div className="Register">
      <section className="vh-100 gradient-custom body">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-white text-black">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <p className="text-gray-50 mb-5">
                      Please enter your ID and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={onUsernameHandler}
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onPasswordHandler}
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordHandler}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <Link to="/connect">
                      <button
                        type="submit"
                        onClick={onRegister}
                        className="btn bg-dark btn-outline-light btn-lg px-5"
                      >
                        Register
                      </button>
                    </Link>
                  </div>

                  <p className="mb-0">Do you have account?</p>
                  <Link to="/connect" className="text-black">
                    Login!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
