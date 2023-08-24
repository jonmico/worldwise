import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import ICity from '../interfaces/city.interface';

const BASE_URL = 'http://localhost:8000';

interface ICitiesContext {
  cities: ICity[];
  error: string;
  isLoading: boolean;
  currentCity: ICity;
  getCity: (id: string) => void;
  createCity: (newCity: ICity) => void;
  deleteCity: (id: string) => void;
}

const CitiesContext = createContext<ICitiesContext | null>(null);

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Unknown action type.');
  }
}

interface CitiesProviderProps {
  children: React.ReactNode;
}

function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState<ICity[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState<ICity>({} as ICity);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: `${err}` });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (id === currentCity.id) return;
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: `${err}` });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity: ICity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: `${err}` });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({ type: 'rejected', payload: `${err}` });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        error,
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
