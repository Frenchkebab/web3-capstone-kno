import { Route } from 'react-router-dom';
import Board from './Components/Board';
import Register from './Components/Register';
import Connect from './Components/Connect';
import Post from './Components/Post';
import Detail from './Components/Detail';
import Mypage from './Components/Mypage';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
