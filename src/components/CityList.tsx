import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';

import ICity from '../interfaces/city.interface';
import Message from './Message';

interface CityListProps {
  cities: ICity[];
  isLoading: boolean;
}

export default function CityList({ cities, isLoading }: CityListProps) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={'Add your first city by clicking on a city on the map!'}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
