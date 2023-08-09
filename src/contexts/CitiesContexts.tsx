import { createContext, useContext, useEffect, useState } from 'react';
import ICity from '../interfaces/city.interface';

const BASE_URL = 'http://localhost:8000';

interface ICitiesContext {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  getCity: (id: string) => void;
  createCity: (newCity: ICity) => void;
  deleteCity: (id: string) => void;
}

const CitiesContext = createContext<ICitiesContext | null>(null);

interface CitiesProviderProps {
  children: React.ReactNode;
}

function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<ICity>({} as ICity);

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

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: ICity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setCities((currentCities) => [...currentCities, data]);
    } catch (err) {
      alert('There was an error creating city.');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: string) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      setCities((currentCities) =>
        currentCities.filter((city) => city.id !== id)
      );
    } catch (err) {
      alert('There was an error deleting city.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);
  if (!value)
    throw new Error('CitiesContext was used outside the CitiesProvider.');
  return value;
}

export { CitiesProvider, useCities };
