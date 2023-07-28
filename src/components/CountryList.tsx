import styles from './CountryList.module.css';
import Spinner from './Spinner';

import ICity from '../interfaces/city.interface';
import ICountry from '../interfaces/country.interface';
import Message from './Message';
import CountryItem from './CountryItem';

interface CityListProps {
  cities: ICity[];
  isLoading: boolean;
}

export default function CountryList({ cities, isLoading }: CityListProps) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={'Add your first city by clicking on a city on the map!'}
      />
    );

  const countries = cities.reduce((arr: ICountry[], city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
