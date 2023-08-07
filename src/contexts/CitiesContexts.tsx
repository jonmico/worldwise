import { createContext, useEffect, useState } from 'react';
import ICity from '../interfaces/city.interface';

const BASE_URL = 'http://localhost:8000';

interface ICitiesContext {
  cities: ICity[];
  isLoading: boolean;
}

const CitiesContext = createContext<ICitiesContext | null>(null);

interface CitiesProviderProps {
  children: React.ReactNode;
}

function CitiesProvider({ children }: CitiesProviderProps) {
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
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
