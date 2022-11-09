import { ethers } from 'ethers';
import React, { useState } from 'react';
import { getProvider } from '../Helpers/provider';
import { useWallet } from './WalletContext';
import KNOV1 from '../artifacts/abis/KNOV1.json';
import KNOToken from '../artifacts/abis/KNOToken.json';
import addresses from '../artifacts/contracts/addresses.json';

const initialState = {};

const ContractContext = React.createContext(initialState);
export const KNOV1Provider = ({ children }) => {
  const { walletAddress } = useWallet();

  const [knov1Contract, setContract] = useState();
  const [knoTokenContract, setknoTokenContract] = useState();

  React.useEffect(() => {
    async function init() {
      let _provider = await getProvider();

      const knoToken = new ethers.Contract(
        addresses.KNOToken,
        KNOToken.abi,
        _provider
      );
      setknoTokenContract(knoToken);

      const knov1 = new ethers.Contract(addresses.KNOV1, KNOV1.abi, _provider);
      setContract(knov1);
    }

    init();
    console.log(knov1Contract, knoTokenContract);
  }, [walletAddress]);

  return (
    <ContractContext.Provider
      value={{
        knov1Contract,
        knoTokenContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useKNOV1Contract = () => React.useContext(ContractContext);
