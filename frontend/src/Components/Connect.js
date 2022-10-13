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

  // useEffect(() => {
  //   async function init() {
  //     const _provider = await getProvider();
  //     setProvider(_provider);
  //     console.log(_provider);
  //     const _walletAddress = await getSignerAddress();
  //     if (_walletAddress) {
  //       setUserWalletAddress(_walletAddress);
  //     }
  //   }

  //   init();
  // }, []);

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
