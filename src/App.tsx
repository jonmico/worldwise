import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';

import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';

import ICity from './interfaces/city.interface';

const BASE_URL = 'http://localhost:8000';

export default function App() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='countries'
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path='countries' element={<p>Countries</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
