import { ethers } from 'ethers';

export const getProvider = async () => {
  let provider;
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_GOERLI_URL
    );
    throw new Error('Web3 Providers not available');
  }
  if (!provider) {
  }
  return provider;
};

export const getSigner = async () => {
  try {
    const provider = await getProvider();
    const signer = provider.getSigner();
    return signer;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSignerAddress = async () => {
  try {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    return signerAddress;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getTruncatedAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
};
