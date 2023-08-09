type Position = {
  lat: string | null;
  lng: string | null;
};

export default interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: Position;
  id?: string;
}
