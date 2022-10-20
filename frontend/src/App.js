import { Route } from 'react-router-dom';
import Board from './Components/Board';
import Register from './Components/Register';
import Connect from './Components/Connect';
import Post from './Components/Post/Post';
import Detail from './Components/Detail';
import Mypage from './Components/Mypage';
import Header from './Components/Header';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { KNOV1ContractState } from './atoms';
import addresses from './artifacts/contracts/addresses.json';
import { getProvider } from './Helpers/provider';
import { ethers } from 'ethers';
import { WalletProvider } from './Context/WalletContext';

function App() {
  // const [KNOV1Contract, setKNOV1Contract] = useRecoilState(KNOV1ContractState);

  useEffect(() => {
    (async () => {
      // const provider = await getProvider();
      const contract = await new ethers.Contract(addresses.KNOV1Address);
      console.log(contract);
    })();
  }, []);

  return (
    <div className="App">
      <WalletProvider>
        <Header></Header>

        <Route exact path="/">
          <Board />
        </Route>

        <Route path="/detail/:idpost">
          <Detail />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/connect">
          <Connect />
        </Route>

        <Route path="/post">
          <Post />
        </Route>

        <Route path="/mypage">
          <Mypage />
        </Route>
      </WalletProvider>
    </div>
  );
}

export default App;
