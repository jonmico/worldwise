import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CitiesProvider } from './contexts/CitiesContexts';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';

import Form from './components/Form';
import { AuthProvider } from './contexts/FakeAuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route path='app' element={<AppLayout />}>
              <Route index element={<Navigate replace to={'cities'} />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='countries' element={<p>Countries</p>} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
