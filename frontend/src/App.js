import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';


function App() {
    return (
      <div>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/product" element={<Product />}>
                <Route path=":productId" element={<Product />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
  