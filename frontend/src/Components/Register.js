import { useRecoilState } from 'recoil';
import { usernameState } from '../atoms';
import { Link, useNavigate } from 'react-router-dom';
import { useKNOV1Contract } from '../Context/KNOV1Context';
import { ethers } from 'ethers';
import { useWallet } from '../Context/WalletContext';
import { getSigner } from '../Helpers/provider';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameState);
  const { knov1Contract } = useKNOV1Contract();
  const { walletAddress } = useWallet();

  const onUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const onRegister = async () => {
    if (!username) {
      alert('Please fill in nickname');
    } else {
      try {
        // call register()
        const signedKnoV1Contract = knov1Contract.connect(await getSigner());
        console.log('Signed KNOV1 Contract: ', signedKnoV1Contract);
        const tx = await signedKnoV1Contract.registerUser(username);
        await tx.wait();
        alert('Wallet Successfully Registered');
      } catch (err) {
        console.log(err.reason);
        alert('Already Registered');
      } finally {
        const isRegistered = await knov1Contract.isRegistered(walletAddress);

        console.log(username);
        console.log(isRegistered);
        navigate('/');
      }

      // document.location.href = '/';
    }
  };

  return (
    <div className="Register">
      <section className="vh-100 gradient-custom body">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-7 col-lg-6 col-xl-5">
              <div className="card bg-white text-black">
                <div className="card-body p-5 pb-0 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <p className="text-gray-50 mt-3 mb-5">
                      Please enter your nickname!
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

                    <Link to="/register">
                      <button
                        type="submit"
                        onClick={onRegister}
                        className="btn bg-dark btn-outline-light btn-lg px-5 mt-4"
                      >
                        Register
                      </button>
                    </Link>
                  </div>
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
