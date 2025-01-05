import React, { useContext } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import SearchResults from './Components/Search/SearchResults';
import SearchContextProvider from './Context/SearchContext';
import banner from './Components/Assets/banner.png';
import { UserProvider, UserContext } from './Context/UserContext';
import ProductList from './Components/Admin/Admin';
import SalesReport from './Components/Admin/SalesReport';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      {user?.role !== 'admin' && <Navbar />}
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory banner={banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={banner} category="kid" />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/search-results" element={<SearchResults />} /> 
        <Route path="/admin" element={<ProductList />} />
        <Route path="/admin/report" element={<SalesReport />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SearchContextProvider>
          <AppContent />
        </SearchContextProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
