import { atom } from 'recoil';
import addresses from './artifacts/contracts/addresses.json';

// used in Board.js
export const viewContentState = atom({
  key: 'viewContentState',
  default: [],
});

export const limitState = atom({
  key: 'limitState',
  default: 6,
});

// used in Detail.js
export const pageState = atom({
  key: 'pageState',
  default: 1,
});

export const questionContentState = atom({
  key: 'questionContentState',
  default: [],
});

export const answerContentState = atom({
  key: 'answerContentState',
  default: [],
});

export const answerState = atom({
  key: 'answerState',
  default: '',
});

// used in Login.js & Register.js
export const usernameState = atom({
  key: 'usernameState',
  default: '',
});

export const passwordState = atom({
  key: 'passwordState',
  default: '',
});

export const confirmPasswordState = atom({
  key: 'confirmPasswordState',
  default: '',
});

// WEB3 Provider and User Wallet
export const providerState = atom({
  key: 'providerStat',
  default: null,
});

export const userWalletState = atom({
  key: 'userWalletState',
  default: null,
});

export const userWalletAddressState = atom({
  key: 'userWalletAddressState',
  default: '',
});

// used in App.js
export const isConnectedState = atom({
  key: 'isConnectedState',
  default: false,
});

// used in Post.js
export const contentState = atom({
  key: 'contentState',
  default: [],
});

export const titleState = atom({
  key: 'titleState',
  default: [],
});

export const authorState = atom({
  key: 'authorState',
  default: '',
});

export const userState = atom({
  key: 'userState',
  default: '',
});

export const isMineState = atom({
  key: 'isMineState',
  default: false,
});

export const idanswerState = atom({
  key: 'idanswerState',
  default: '',
});

export const acceptedAnswerState = atom({
  key: 'acceptedAnswerState',
  default: [],
});

export const acceptedState = atom({
  key: 'acceptedState',
  default: 'false',
});

// contract addresses

export const KNOV1ContractState = atom({
  key: 'KNOV1ContractState',
  default: null,
});
