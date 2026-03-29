export interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  weatherCode: number;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  high: number;
  low: number;
  precipitation: number;
  daily: DailyForecast[];
}

export interface CityData {
  location: LocationData;
  weather: WeatherData | null;
  searchQuery: string;
}

export type SearchType = 'zip' | 'airport' | 'city';
