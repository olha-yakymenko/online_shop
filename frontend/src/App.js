import React, { useContext } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import SearchContextProvider from './Context/SearchContext';
import { UserProvider, UserContext } from './Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import ShopContextProvider from './Context/ShopContext';
import ShopCategory from './Pages/ShopCategory';
import banner from './Components/Assets/banner.png';

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      {user?.role !== 'admin' && <Navbar />}
      <Routes>
        <Route path="/" element={<Shop />} />
        
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/mens" element={<ShopCategory banner={banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={banner} category="kid" />} />
      </Routes>

    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SearchContextProvider>
          <ShopContextProvider>
          <AppContent />
          </ShopContextProvider>
        </SearchContextProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
