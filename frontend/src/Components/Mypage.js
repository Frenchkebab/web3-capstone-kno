import { useEffect, useState } from 'react';
import { useKNOV1Contract } from '../Context/ContractContext';
import { useWallet } from '../Context/WalletContext';
import { getSigner } from '../Helpers/provider';
import { utils } from 'ethers';
import addresses from '../artifacts/contracts/addresses.json';

function Mypage() {
  const { knov1Contract, knoTokenContract } = useKNOV1Contract();
  const { walletAddress } = useWallet();
  const [userNickname, setUserNickname] = useState();
  const [userBalance, setUserBalance] = useState();
  // const [signedContract, setSignedContract] = useState();

  useEffect(() => {
    const sign = async () => {
      const signedKnoV1Contract = knov1Contract.connect(await getSigner());

      // get nickname from contract
      const nickname = await signedKnoV1Contract.getUserNickname(walletAddress);
      setUserNickname(nickname);
      console.log(nickname);
      // setSignedContract(signedContract);

      const balance = await knoTokenContract.balanceOf(walletAddress);
      setUserBalance(utils.formatEther(balance));
    };

    if (walletAddress) {
      sign();
    }
  }, [walletAddress]);

  return (
    <div className="Mypage">
      <section className="vh-100 gradient-custom body">
        <div className="container py-5 pt-0">
          <div className="box pt-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <h2 className="fw-bold mb-2 text-center">My Information</h2>
              <div className="inform-card col-12 col-md-8 col-lg-6 col-xl-5 pt-3">
                <div className="card bg-white text-black">
                  <div className="card-body p-4">
                    <div className="row mypage-row">
                      <div className="col fw-bold">Nickaname</div>
                      <div className="col-8">{userNickname}</div>
                    </div>
                    <div className="row mypage-row">
                      <div className="col fw-bold">Wallet Address</div>
                      <div className="col-8">
                        <a
                          href={`https://goerli.etherscan.io/address/${walletAddress}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {walletAddress}
                        </a>
                      </div>
                    </div>
                    <div className="row mypage-row">
                      <div className="col fw-bold">KNO Token Balance</div>
                      <div className="col-8">{userBalance} KNO</div>
                    </div>
                    <div className="row mypage-row">
                      <div className="col fw-bold">KNO Contract Address</div>
                      <div className="col-8">
                        <a
                          href={`https://goerli.etherscan.io/address/${addresses.KNOV1}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {addresses.KNOV1}
                        </a>
                      </div>
                    </div>
                    <div className="row mypage-row">
                      <div className="col fw-bold">KNO Token Address</div>
                      <div className="col-8">
                        <a
                          href={`https://goerli.etherscan.io/token/${addresses.KNOToken}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {addresses.KNOToken}
                        </a>
                      </div>
                    </div>
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

export default Mypage;
