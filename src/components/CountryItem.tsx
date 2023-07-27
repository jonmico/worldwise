import styles from './CountryItem.module.css';

import ICountry from '../interfaces/country.interface';

interface CountryItemProps {
  country: ICountry;
}

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
