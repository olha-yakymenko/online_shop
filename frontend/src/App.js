import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';


function App() {
    return (
      <div>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Shop />} />
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
  