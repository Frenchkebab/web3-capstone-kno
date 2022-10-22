import { ethers } from 'ethers';
import React from 'react';
import { getProvider } from '../Helpers/provider';
import { useWallet } from './WalletContext';
import KNOV1 from '../artifacts/abis/KNOV1.json';
import addresses from '../artifacts/contracts/addresses.json';

const initialState = {};

const KNOV1Context = React.createContext(initialState);
export const KNOV1Provider = ({ children }) => {
  const { walletAddress } = useWallet();

  const [contract, setContract] = React.useState();

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      console.log(_provider, signer);
      const _contract = new ethers.Contract(
        addresses.KNOV1,
        KNOV1.abi,
        _provider
      );
      setContract(_contract);
    }

    if (walletAddress) {
      init();
    }
  }, [walletAddress]);

  return (
    <KNOV1Context.Provider
      value={{
        knov1Contract: contract,
      }}
    >
      {children}
    </KNOV1Context.Provider>
  );
};

export const useKNOV1Contract = () => React.useContext(KNOV1Context);
