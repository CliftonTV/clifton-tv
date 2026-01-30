import { AIRPORT_CODES } from '../constants/airports';
import { LocationData, WeatherData, SearchType } from './types';

export function detectSearchType(query: string): SearchType {
  const trimmed = query.trim().toUpperCase();

  // Check if it's a US zip code (5 digits or 5+4 format)
  if (/^\d{5}(-\d{4})?$/.test(trimmed)) {
    return 'zip';
  }

  // Check if it's an airport code (3 letters)
  if (/^[A-Z]{3}$/.test(trimmed) && AIRPORT_CODES[trimmed]) {
    return 'airport';
  }

  return 'city';
}

export async function geocodeLocation(query: string): Promise<LocationData | null> {
  const searchType = detectSearchType(query);
  let searchQuery = query.trim();

  // If it's an airport code, convert to city name
  if (searchType === 'airport') {
    const airport = AIRPORT_CODES[query.trim().toUpperCase()];
    if (airport) {
      searchQuery = `${airport.city}, ${airport.country}`;
    }
  }

  // If it's a zip code, use it with US country code
  if (searchType === 'zip') {
    searchQuery = `${query.trim()}, US`;
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        searchQuery
      )}&count=1&language=en&format=json`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone,
      };
    }

    // Fallback for zip codes using a different approach
    if (searchType === 'zip') {
      const zipResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query.trim()}&count=5&language=en&format=json`
      );
      const zipData = await zipResponse.json();
      if (zipData.results && zipData.results.length > 0) {
        const result = zipData.results[0];
        return {
          name: result.name,
          country: result.country,
          latitude: result.latitude,
          longitude: result.longitude,
          timezone: result.timezone,
        };
      }
    }

    return null;
  } catch (err) {
    console.error('Geocoding error:', err);
    return null;
  }
}

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] || 'Unknown';
}

export async function fetchWeather(
  lat: number,
  lon: number,
  timezone: string
): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(
        timezone
      )}&forecast_days=7`
    );
    const data = await response.json();

    if (data.current) {
      return {
        temperature: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        weatherCode: data.current.weather_code,
        description: getWeatherDescription(data.current.weather_code),
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        precipitation: data.current.precipitation,
        daily: data.daily.time.map((date: string, i: number) => ({
          date,
          high: Math.round(data.daily.temperature_2m_max[i]),
          low: Math.round(data.daily.temperature_2m_min[i]),
          weatherCode: data.daily.weather_code[i],
        })),
      };
    }
    return null;
  } catch (err) {
    console.error('Weather fetch error:', err);
    return null;
  }
}

export function getAccommodationLinks(city: string, country: string) {
  const encodedLocation = encodeURIComponent(`${city}, ${country}`);

  return {
    airbnb: `https://www.airbnb.com/s/${encodedLocation}/homes`,
    booking: `https://www.booking.com/searchresults.html?ss=${encodedLocation}`,
    hotels: `https://www.hotels.com/search.do?destination=${encodedLocation}`,
    vrbo: `https://www.vrbo.com/search?destination=${encodedLocation}`,
    expedia: `https://www.expedia.com/Hotel-Search?destination=${encodedLocation}`,
    tripadvisor: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(city)}`,
  };
}

export function getThingsToDoLinks(city: string, country: string) {
  const encodedLocation = encodeURIComponent(`${city}, ${country}`);
  const encodedCity = encodeURIComponent(city);

  return {
    yelp: `https://www.yelp.com/search?find_loc=${encodedLocation}`,
    googleMaps: `https://www.google.com/maps/search/things+to+do+in+${encodedLocation}`,
    viator: `https://www.viator.com/searchResults/all?text=${encodedLocation}`,
    getYourGuide: `https://www.getyourguide.com/s?q=${encodedLocation}`,
    tripadvisorDining: `https://www.tripadvisor.com/Search?q=${encodedCity}+restaurants`,
    tripadvisorAttractions: `https://www.tripadvisor.com/Search?q=${encodedCity}+attractions`,
  };
}

export function formatDay(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', { weekday: 'short' });
}
