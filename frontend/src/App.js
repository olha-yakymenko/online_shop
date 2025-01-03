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
