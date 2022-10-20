import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProvider, getSignerAddress } from '../Helpers/provider';

const WalletContext = createContext({});

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      setProvider(_provider);
      console.log(_provider);
      const _walletAddress = await getSignerAddress();
      if (_walletAddress) {
        setWalletAddress(_walletAddress);
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
