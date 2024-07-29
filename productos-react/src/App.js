import './App.css';
import Show from './components/Show';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Show/>}/> {/*Route fo Show Component*/}
          <Route path='/create' element={<Create/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
