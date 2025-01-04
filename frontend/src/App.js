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
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

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
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
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
