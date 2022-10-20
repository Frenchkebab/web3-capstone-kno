import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProvider, getSignerAddress } from '../Helpers/provider';

const WalletContext = createContext({});

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    async function init() {
      console.log('WalletContext');
      const _provider = await getProvider();
      setProvider(_provider);
      console.log(_provider);
      const _walletAddress = await getSignerAddress();
      if (_walletAddress) {
        setWalletAddress(_walletAddress);
      } else {
        console.log(isRegistered);
      }
    }
    init();
  }, []);

  if (provider) {
    provider.on('accountChanged', (address) => {
      console.log('address: ', address);
    });
  }

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        isRegistered,
        setIsRegistered,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
