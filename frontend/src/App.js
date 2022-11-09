import { Route, Routes } from 'react-router-dom';
import Board from './Components/Board';
import Register from './Components/Register';
import Connect from './Components/Connect';
import Post from './Components/Post/Post';
import Detail from './Components/Detail';
import Mypage from './Components/Mypage';
import Header from './Components/Header';
import { WalletProvider } from './Context/WalletContext';
import { KNOV1Provider } from './Context/ContractContext';

function App() {
  return (
    <div className="App">
      <WalletProvider>
        <KNOV1Provider>
          <Header></Header>

          <Routes>
            <Route path="/" element={<Board />} />

            <Route path="/detail/:qid" element={<Detail />} />

            <Route path="/register" element={<Register />} />

            <Route path="/connect" element={<Connect />} />

            <Route path="/post" element={<Post />} />

            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </KNOV1Provider>
      </WalletProvider>
    </div>
  );
}

export default App;
