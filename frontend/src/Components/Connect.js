import { useWallet } from '../Context/WalletContext';
import { getSignerAddress } from '../Helpers/provider';

function Connect() {
  const { walletAddress, setWalletAddress } = useWallet();

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
