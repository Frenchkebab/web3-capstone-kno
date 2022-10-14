import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  isConnectedState,
  providerState,
  userWalletAddressState,
} from '../atoms';
import { getProvider, getSignerAddress } from '../Helpers/provider';

function Connect() {
  const [userWalletAddress, setUserWalletAddress] = useRecoilState(
    userWalletAddressState
  );
  const [isConnected, setIsConnected] = useRecoilState(isConnectedState);
  const [provider, setProvider] = useRecoilState(providerState);

  useEffect(() => {
    handleConnect();
  }, []);

  if (provider) {
    provider.on('accountChanged', (address) => {
      console.log(address);
    });
  }

  const handleConnect = async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });
      console.log(ethereum);
      const address = await getSignerAddress();
      if (address) {
        console.log(address);
        setUserWalletAddress(address);
        setIsConnected(true);
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
