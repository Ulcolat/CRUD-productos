import logo from './logo.svg';
import './App.css';
import Show from './components/Show';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Show/>}/> {/*Route fo Show Component*/}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
