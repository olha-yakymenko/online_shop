import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <SearchContextProvider> 
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </SearchContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
  