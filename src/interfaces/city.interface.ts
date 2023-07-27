type Position = {
  lat: number;
  long: number;
};

export default interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
  id: number;
}
