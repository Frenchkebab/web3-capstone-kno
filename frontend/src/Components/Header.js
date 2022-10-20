import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isConnectedState } from '../atoms';
import { useWallet } from '../Context/WalletContext';
import { getTruncatedAddress } from '../Helpers/provider';
import Connect from './Connect';

function Header() {
  const { walletAddress, setWalletAddress, isRegistered } = useWallet();

  return (
    <div className="Header">
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <li className="px-2 text-white">KNOLEDGER</li>
              </Link>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              ></input>
            </form>

            <div className="text-end">
              {walletAddress ? (
                <span className="me-2">
                  {getTruncatedAddress(walletAddress)}
                </span>
              ) : (
                <Connect />
              )}

              {walletAddress && isRegistered ? (
                <Link to="/mypage">
                  <button type="button" className="btn btn-outline-light me-2">
                    My Page
                  </button>
                </Link>
              ) : (
                <Link to="/register">
                  <button type="button" className="btn btn-outline-light me-2">
                    Register
                  </button>
                </Link>
              )}

              {walletAddress && isRegistered ? (
                <Link to="/post">
                  <button type="button" className="btn btn-outline-light me-2">
                    Post Question
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
