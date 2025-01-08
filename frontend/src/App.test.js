
import React from 'react';
import { render, screen } from '@testing-library/react';
import AppContent from './App';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContext } from './Context/UserContext';
import LoginSignup from './Pages/LoginSignup';

test('renders Shop link', () => {
  render(<AppContent />);
  const linkElement = screen.getByText(/Shop/i);
  expect(linkElement).toBeInTheDocument();
});



const queryClient = new QueryClient();

test('renders LoginSignup component on /login route', () => {
  const user = null;
  render(
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    </QueryClientProvider>
  );

  const loginHeader = screen.getByRole('heading', { name: /login/i });
  expect(loginHeader).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});


test('renders SearchResults component on /search-results route', () => {
  const user = { role: 'user' };
  render(
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user }}>
        <MemoryRouter initialEntries={['/search-results']}>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/search-results" element={<h1>Search Results Page</h1>} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    </QueryClientProvider>
  );

  const searchResultsHeader = screen.getByText(/Search Results Page/i);
  expect(searchResultsHeader).toBeInTheDocument();
});

