import logo from './logo.svg';
import './App.css';
import Show from './components/Show';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Show/>}/> {/*Route fo Show Component*/}
          <Route path='/create' element={<Create/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
