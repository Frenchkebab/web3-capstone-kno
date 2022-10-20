import { useEffect } from 'react';
import { useKNOV1Contract } from '../Context/KNOV1Context';
import { useWallet } from '../Context/WalletContext';
import { getSigner, getSignerAddress } from '../Helpers/provider';

function Connect() {
  const { walletAddress, setWalletAddress } = useWallet();
  const { knov1Contract } = useKNOV1Contract();

  // Connect
  const handleConnect = async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const address = await getSignerAddress();
      if (address) {
        setWalletAddress(address);
      }
    }
  };

  useEffect(() => {
    if (walletAddress) {
      (async () => {
        console.log(await knov1Contract.isRegistered(walletAddress));
      })();
    }
  }, [walletAddress]);

  return (
    <button
      type="button"
      className="btn btn-outline-light me-2"
      onClick={handleConnect}
    >
      Connect
    </button>
  );
}

export default Connect;
