"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Plane,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Hotel,
  Home,
  Coffee,
  Utensils,
  Camera,
  Music,
  ArrowRight,
  Loader2,
} from "lucide-react";

// Airport codes database (major US and international airports)
const AIRPORT_CODES: Record<string, { city: string; country: string }> = {
  JFK: { city: "New York", country: "US" },
  LAX: { city: "Los Angeles", country: "US" },
  ORD: { city: "Chicago", country: "US" },
  DFW: { city: "Dallas", country: "US" },
  DEN: { city: "Denver", country: "US" },
  SFO: { city: "San Francisco", country: "US" },
  SEA: { city: "Seattle", country: "US" },
  LAS: { city: "Las Vegas", country: "US" },
  MCO: { city: "Orlando", country: "US" },
  MIA: { city: "Miami", country: "US" },
  ATL: { city: "Atlanta", country: "US" },
  BOS: { city: "Boston", country: "US" },
  PHX: { city: "Phoenix", country: "US" },
  IAH: { city: "Houston", country: "US" },
  MSP: { city: "Minneapolis", country: "US" },
  DTW: { city: "Detroit", country: "US" },
  PHL: { city: "Philadelphia", country: "US" },
  LGA: { city: "New York", country: "US" },
  EWR: { city: "Newark", country: "US" },
  SAN: { city: "San Diego", country: "US" },
  TPA: { city: "Tampa", country: "US" },
  PDX: { city: "Portland", country: "US" },
  SLC: { city: "Salt Lake City", country: "US" },
  DCA: { city: "Washington DC", country: "US" },
  IAD: { city: "Washington DC", country: "US" },
  BWI: { city: "Baltimore", country: "US" },
  AUS: { city: "Austin", country: "US" },
  BNA: { city: "Nashville", country: "US" },
  RDU: { city: "Raleigh", country: "US" },
  CLE: { city: "Cleveland", country: "US" },
  CMH: { city: "Columbus", country: "US" },
  IND: { city: "Indianapolis", country: "US" },
  MCI: { city: "Kansas City", country: "US" },
  STL: { city: "St. Louis", country: "US" },
  MSY: { city: "New Orleans", country: "US" },
  SJC: { city: "San Jose", country: "US" },
  OAK: { city: "Oakland", country: "US" },
  SMF: { city: "Sacramento", country: "US" },
  SNA: { city: "Santa Ana", country: "US" },
  HNL: { city: "Honolulu", country: "US" },
  ANC: { city: "Anchorage", country: "US" },
  LHR: { city: "London", country: "GB" },
  CDG: { city: "Paris", country: "FR" },
  FRA: { city: "Frankfurt", country: "DE" },
  AMS: { city: "Amsterdam", country: "NL" },
  MAD: { city: "Madrid", country: "ES" },
  BCN: { city: "Barcelona", country: "ES" },
  FCO: { city: "Rome", country: "IT" },
  MXP: { city: "Milan", country: "IT" },
  ZRH: { city: "Zurich", country: "CH" },
  VIE: { city: "Vienna", country: "AT" },
  MUC: { city: "Munich", country: "DE" },
  DUB: { city: "Dublin", country: "IE" },
  LIS: { city: "Lisbon", country: "PT" },
  CPH: { city: "Copenhagen", country: "DK" },
  OSL: { city: "Oslo", country: "NO" },
  ARN: { city: "Stockholm", country: "SE" },
  HEL: { city: "Helsinki", country: "FI" },
  NRT: { city: "Tokyo", country: "JP" },
  HND: { city: "Tokyo", country: "JP" },
  ICN: { city: "Seoul", country: "KR" },
  PEK: { city: "Beijing", country: "CN" },
  PVG: { city: "Shanghai", country: "CN" },
  HKG: { city: "Hong Kong", country: "HK" },
  SIN: { city: "Singapore", country: "SG" },
  BKK: { city: "Bangkok", country: "TH" },
  SYD: { city: "Sydney", country: "AU" },
  MEL: { city: "Melbourne", country: "AU" },
  AKL: { city: "Auckland", country: "NZ" },
  DXB: { city: "Dubai", country: "AE" },
  DOH: { city: "Doha", country: "QA" },
  IST: { city: "Istanbul", country: "TR" },
  MEX: { city: "Mexico City", country: "MX" },
  CUN: { city: "Cancun", country: "MX" },
  GRU: { city: "Sao Paulo", country: "BR" },
  EZE: { city: "Buenos Aires", country: "AR" },
  SCL: { city: "Santiago", country: "CL" },
  BOG: { city: "Bogota", country: "CO" },
  LIM: { city: "Lima", country: "PE" },
  YYZ: { city: "Toronto", country: "CA" },
  YVR: { city: "Vancouver", country: "CA" },
  YUL: { city: "Montreal", country: "CA" },
  YYC: { city: "Calgary", country: "CA" },
};

interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  high: number;
  low: number;
  precipitation: number;
  daily: {
    date: string;
    high: number;
    low: number;
    weatherCode: number;
  }[];
}

interface CityData {
  location: LocationData;
  weather: WeatherData | null;
  searchQuery: string;
}

// Weather code descriptions
function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return descriptions[code] || "Unknown";
}

// Weather icon component
function WeatherIcon({
  code,
  className = "h-8 w-8",
}: {
  code: number;
  className?: string;
}) {
  if (code === 0 || code === 1) {
    return <Sun className={`${className} text-yellow-500`} />;
  } else if (code >= 2 && code <= 3) {
    return <Cloud className={`${className} text-gray-500`} />;
  } else if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return <CloudRain className={`${className} text-blue-500`} />;
  } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return <Snowflake className={`${className} text-blue-300`} />;
  } else if (code >= 95) {
    return <CloudRain className={`${className} text-purple-500`} />;
  }
  return <Cloud className={`${className} text-gray-400`} />;
}

export default function TravelPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originData, setOriginData] = useState<CityData | null>(null);
  const [destinationData, setDestinationData] = useState<CityData | null>(null);
  const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
  const [isLoadingDestination, setIsLoadingDestination] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect search type
  function detectSearchType(query: string): "zip" | "airport" | "city" {
    const trimmed = query.trim().toUpperCase();

    // Check if it's a US zip code (5 digits or 5+4 format)
    if (/^\d{5}(-\d{4})?$/.test(trimmed)) {
      return "zip";
    }

    // Check if it's an airport code (3 letters)
    if (/^[A-Z]{3}$/.test(trimmed) && AIRPORT_CODES[trimmed]) {
      return "airport";
    }

    return "city";
  }

  // Geocode location
  async function geocodeLocation(query: string): Promise<LocationData | null> {
    const searchType = detectSearchType(query);
    let searchQuery = query.trim();

    // If it's an airport code, convert to city name
    if (searchType === "airport") {
      const airport = AIRPORT_CODES[query.trim().toUpperCase()];
      if (airport) {
        searchQuery = `${airport.city}, ${airport.country}`;
      }
    }

    // If it's a zip code, use it with US country code
    if (searchType === "zip") {
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
      if (searchType === "zip") {
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
      console.error("Geocoding error:", err);
      return null;
    }
  }

  // Fetch weather data
  async function fetchWeather(
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
      console.error("Weather fetch error:", err);
      return null;
    }
  }

  // Search for a city
  async function searchCity(
    query: string,
    type: "origin" | "destination"
  ): Promise<void> {
    if (!query.trim()) return;

    const setLoading =
      type === "origin" ? setIsLoadingOrigin : setIsLoadingDestination;
    const setData = type === "origin" ? setOriginData : setDestinationData;

    setLoading(true);
    setError(null);

    try {
      const location = await geocodeLocation(query);
      if (!location) {
        setError(`Could not find location: ${query}`);
        setLoading(false);
        return;
      }

      const weather = await fetchWeather(
        location.latitude,
        location.longitude,
        location.timezone
      );

      setData({
        location,
        weather,
        searchQuery: query,
      });
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (origin) searchCity(origin, "origin");
    if (destination) searchCity(destination, "destination");
  }

  // Generate accommodation links
  function getAccommodationLinks(city: string, country: string) {
    const encodedLocation = encodeURIComponent(`${city}, ${country}`);
    const encodedCity = encodeURIComponent(city);

    return {
      airbnb: `https://www.airbnb.com/s/${encodedLocation}/homes`,
      booking: `https://www.booking.com/searchresults.html?ss=${encodedLocation}`,
      hotels: `https://www.hotels.com/search.do?destination=${encodedLocation}`,
      vrbo: `https://www.vrbo.com/search?destination=${encodedLocation}`,
      expedia: `https://www.expedia.com/Hotel-Search?destination=${encodedLocation}`,
      tripadvisor: `https://www.tripadvisor.com/Search?q=${encodedCity}`,
    };
  }

  // Generate things to do links
  function getThingsToDoLinks(city: string, country: string) {
    const encodedLocation = encodeURIComponent(`${city}, ${country}`);
    const encodedCity = encodeURIComponent(city);

    return {
      restaurants: `https://www.tripadvisor.com/Restaurants-g${encodedCity}`,
      attractions: `https://www.tripadvisor.com/Attractions-g${encodedCity}`,
      yelp: `https://www.yelp.com/search?find_loc=${encodedLocation}`,
      googleMaps: `https://www.google.com/maps/search/things+to+do+in+${encodedLocation}`,
      viator: `https://www.viator.com/searchResults/all?text=${encodedLocation}`,
      getYourGuide: `https://www.getyourguide.com/s?q=${encodedLocation}`,
    };
  }

  // Format day name
  function formatDay(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#fff5f0] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Plane className="h-10 w-10 text-[#d44000]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Weather & Travel Planner
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Search by city name, zip code, or airport code to compare weather
              and find the perfect accommodations for your trip.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Origin (city, zip, or airport code)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="pl-10 h-14 text-lg border-2 border-gray-200 focus:border-[#d44000]"
                />
              </div>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Destination (city, zip, or airport code)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-14 text-lg border-2 border-gray-200 focus:border-[#d44000]"
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={
                (!origin && !destination) ||
                isLoadingOrigin ||
                isLoadingDestination
              }
              className="w-full md:w-auto h-14 px-12 bg-[#d44000] hover:bg-[#b83600] text-lg"
            >
              {isLoadingOrigin || isLoadingDestination ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Search Weather & Travel Info
                </>
              )}
            </Button>

            <p className="mt-4 text-sm text-gray-500">
              Try: "NYC", "90210", "LAX", "London", "Paris CDG"
            </p>
          </motion.form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg max-w-xl mx-auto"
            >
              {error}
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {(originData || destinationData) && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Origin Weather Card */}
              {originData && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-gray-200 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                          Origin
                        </span>
                      </div>
                      <CardTitle className="text-2xl">
                        {originData.location.name},{" "}
                        {originData.location.country}
                      </CardTitle>
                      <CardDescription>
                        Searched: {originData.searchQuery}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {originData.weather && (
                        <>
                          {/* Current Weather */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <WeatherIcon
                                code={originData.weather.weatherCode}
                                className="h-16 w-16"
                              />
                              <div>
                                <div className="text-5xl font-bold text-gray-900">
                                  {originData.weather.temperature}°C
                                </div>
                                <div className="text-gray-500">
                                  {originData.weather.description}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                H: {originData.weather.high}° L:{" "}
                                {originData.weather.low}°
                              </div>
                              <div className="text-sm text-gray-500">
                                Feels like {originData.weather.feelsLike}°C
                              </div>
                            </div>
                          </div>

                          {/* Weather Details */}
                          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Droplets className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Humidity
                                </div>
                                <div className="font-medium">
                                  {originData.weather.humidity}%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wind className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Wind
                                </div>
                                <div className="font-medium">
                                  {originData.weather.windSpeed} km/h
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-red-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Precip
                                </div>
                                <div className="font-medium">
                                  {originData.weather.precipitation} mm
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 7-Day Forecast */}
                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                              7-Day Forecast
                            </h4>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {originData.weather.daily.map((day, i) => (
                                <div
                                  key={day.date}
                                  className={`flex-shrink-0 w-16 text-center p-2 rounded-lg ${
                                    i === 0 ? "bg-blue-50" : "bg-gray-50"
                                  }`}
                                >
                                  <div className="text-xs font-medium text-gray-600">
                                    {formatDay(day.date)}
                                  </div>
                                  <WeatherIcon
                                    code={day.weatherCode}
                                    className="h-6 w-6 mx-auto my-1"
                                  />
                                  <div className="text-xs">
                                    <span className="font-medium">
                                      {day.high}°
                                    </span>
                                    <span className="text-gray-400">
                                      {" "}
                                      {day.low}°
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Destination Weather Card */}
              {destinationData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-[#d44000] overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-[#fff5f0] to-orange-100">
                      <div className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-[#d44000]" />
                        <span className="text-sm font-medium text-[#d44000] uppercase tracking-wide">
                          Destination
                        </span>
                      </div>
                      <CardTitle className="text-2xl">
                        {destinationData.location.name},{" "}
                        {destinationData.location.country}
                      </CardTitle>
                      <CardDescription>
                        Searched: {destinationData.searchQuery}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {destinationData.weather && (
                        <>
                          {/* Current Weather */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <WeatherIcon
                                code={destinationData.weather.weatherCode}
                                className="h-16 w-16"
                              />
                              <div>
                                <div className="text-5xl font-bold text-gray-900">
                                  {destinationData.weather.temperature}°C
                                </div>
                                <div className="text-gray-500">
                                  {destinationData.weather.description}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                H: {destinationData.weather.high}° L:{" "}
                                {destinationData.weather.low}°
                              </div>
                              <div className="text-sm text-gray-500">
                                Feels like {destinationData.weather.feelsLike}°C
                              </div>
                            </div>
                          </div>

                          {/* Weather Details */}
                          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Droplets className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Humidity
                                </div>
                                <div className="font-medium">
                                  {destinationData.weather.humidity}%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wind className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Wind
                                </div>
                                <div className="font-medium">
                                  {destinationData.weather.windSpeed} km/h
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-red-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Precip
                                </div>
                                <div className="font-medium">
                                  {destinationData.weather.precipitation} mm
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 7-Day Forecast */}
                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                              7-Day Forecast
                            </h4>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {destinationData.weather.daily.map((day, i) => (
                                <div
                                  key={day.date}
                                  className={`flex-shrink-0 w-16 text-center p-2 rounded-lg ${
                                    i === 0 ? "bg-orange-50" : "bg-gray-50"
                                  }`}
                                >
                                  <div className="text-xs font-medium text-gray-600">
                                    {formatDay(day.date)}
                                  </div>
                                  <WeatherIcon
                                    code={day.weatherCode}
                                    className="h-6 w-6 mx-auto my-1"
                                  />
                                  <div className="text-xs">
                                    <span className="font-medium">
                                      {day.high}°
                                    </span>
                                    <span className="text-gray-400">
                                      {" "}
                                      {day.low}°
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Accommodations Section */}
      {destinationData && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="py-12 px-4 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Stay in {destinationData.location.name}
            </h2>
            <p className="text-gray-600 mb-8">
              Find the perfect place to stay during your trip
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                const links = getAccommodationLinks(
                  destinationData.location.name,
                  destinationData.location.country
                );
                return (
                  <>
                    <a
                      href={links.airbnb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#FF5A5F] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#FF5A5F]/10 rounded-lg flex items-center justify-center">
                            <Home className="h-6 w-6 text-[#FF5A5F]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#FF5A5F]">
                              Airbnb
                            </h3>
                            <p className="text-sm text-gray-500">
                              Unique homes & experiences
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF5A5F]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.booking}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#003580] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#003580]/10 rounded-lg flex items-center justify-center">
                            <Hotel className="h-6 w-6 text-[#003580]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#003580]">
                              Booking.com
                            </h3>
                            <p className="text-sm text-gray-500">
                              Hotels & apartments
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#003580]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.hotels}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#D32F2F] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#D32F2F]/10 rounded-lg flex items-center justify-center">
                            <Hotel className="h-6 w-6 text-[#D32F2F]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#D32F2F]">
                              Hotels.com
                            </h3>
                            <p className="text-sm text-gray-500">
                              Earn free nights
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#D32F2F]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.vrbo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#0077CC] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#0077CC]/10 rounded-lg flex items-center justify-center">
                            <Home className="h-6 w-6 text-[#0077CC]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#0077CC]">
                              VRBO
                            </h3>
                            <p className="text-sm text-gray-500">
                              Vacation rentals
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#0077CC]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.expedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#FFCC00] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#FFCC00]/10 rounded-lg flex items-center justify-center">
                            <Hotel className="h-6 w-6 text-[#CC9900]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#CC9900]">
                              Expedia
                            </h3>
                            <p className="text-sm text-gray-500">
                              Bundle & save
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#CC9900]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.tripadvisor}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#00AF87] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#00AF87]/10 rounded-lg flex items-center justify-center">
                            <Hotel className="h-6 w-6 text-[#00AF87]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#00AF87]">
                              TripAdvisor
                            </h3>
                            <p className="text-sm text-gray-500">
                              Reviews & deals
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#00AF87]" />
                        </CardContent>
                      </Card>
                    </a>
                  </>
                );
              })()}
            </div>
          </div>
        </motion.section>
      )}

      {/* Things to Do Section */}
      {destinationData && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-12 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Things to Do in {destinationData.location.name}
            </h2>
            <p className="text-gray-600 mb-8">
              Discover restaurants, attractions, and experiences
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                const links = getThingsToDoLinks(
                  destinationData.location.name,
                  destinationData.location.country
                );
                return (
                  <>
                    <a
                      href={links.yelp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#FF1A1A] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#FF1A1A]/10 rounded-lg flex items-center justify-center">
                            <Utensils className="h-6 w-6 text-[#FF1A1A]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#FF1A1A]">
                              Yelp
                            </h3>
                            <p className="text-sm text-gray-500">
                              Restaurants & services
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF1A1A]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#4285F4] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#4285F4]/10 rounded-lg flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-[#4285F4]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#4285F4]">
                              Google Maps
                            </h3>
                            <p className="text-sm text-gray-500">
                              Explore the area
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#4285F4]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.viator}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#3A3A3A] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#3A3A3A]/10 rounded-lg flex items-center justify-center">
                            <Camera className="h-6 w-6 text-[#3A3A3A]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#3A3A3A]">
                              Viator
                            </h3>
                            <p className="text-sm text-gray-500">
                              Tours & activities
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#3A3A3A]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={links.getYourGuide}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#FF5533] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#FF5533]/10 rounded-lg flex items-center justify-center">
                            <Music className="h-6 w-6 text-[#FF5533]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#FF5533]">
                              GetYourGuide
                            </h3>
                            <p className="text-sm text-gray-500">
                              Experiences & tickets
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF5533]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={`https://www.tripadvisor.com/Search?q=${encodeURIComponent(
                        destinationData.location.name
                      )}+restaurants`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#00AF87] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#00AF87]/10 rounded-lg flex items-center justify-center">
                            <Coffee className="h-6 w-6 text-[#00AF87]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#00AF87]">
                              TripAdvisor Dining
                            </h3>
                            <p className="text-sm text-gray-500">
                              Top restaurants
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#00AF87]" />
                        </CardContent>
                      </Card>
                    </a>

                    <a
                      href={`https://www.tripadvisor.com/Search?q=${encodeURIComponent(
                        destinationData.location.name
                      )}+attractions`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="border-2 hover:border-[#00AF87] transition-all hover:shadow-lg cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="h-12 w-12 bg-[#00AF87]/10 rounded-lg flex items-center justify-center">
                            <Camera className="h-6 w-6 text-[#00AF87]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#00AF87]">
                              TripAdvisor Attractions
                            </h3>
                            <p className="text-sm text-gray-500">
                              Things to see
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#00AF87]" />
                        </CardContent>
                      </Card>
                    </a>
                  </>
                );
              })()}
            </div>
          </div>
        </motion.section>
      )}

      {/* Empty State */}
      {!originData && !destinationData && (
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <Plane className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Start Planning Your Trip
              </h2>
              <p className="text-gray-600">
                Enter your origin and destination above to see weather
                forecasts, find accommodations, and discover things to do.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Search Flexibly
                </h3>
                <p className="text-sm text-gray-500">
                  Use city names, zip codes, or airport codes like LAX, JFK, or
                  CDG
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🌤️</div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Compare Weather
                </h3>
                <p className="text-sm text-gray-500">
                  See current conditions and 7-day forecasts for both locations
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🏨</div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Find Stays & Activities
                </h3>
                <p className="text-sm text-gray-500">
                  Direct links to Airbnb, hotels, restaurants, and attractions
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
