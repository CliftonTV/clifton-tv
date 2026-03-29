import Foundation

enum SearchType {
    case zip
    case airport
    case city
}

actor WeatherService {
    static let shared = WeatherService()

    private init() {}

    // MARK: - Search Type Detection

    func detectSearchType(_ query: String) -> SearchType {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

        // Check if it's a US zip code (5 digits or 5+4 format)
        let zipRegex = try? NSRegularExpression(pattern: "^\\d{5}(-\\d{4})?$")
        if let regex = zipRegex {
            let range = NSRange(location: 0, length: trimmed.utf16.count)
            if regex.firstMatch(in: trimmed, options: [], range: range) != nil {
                return .zip
            }
        }

        // Check if it's an airport code (3 letters)
        let airportRegex = try? NSRegularExpression(pattern: "^[A-Z]{3}$")
        if let regex = airportRegex {
            let range = NSRange(location: 0, length: trimmed.utf16.count)
            if regex.firstMatch(in: trimmed, options: [], range: range) != nil,
               AirportCodes.lookup(trimmed) != nil {
                return .airport
            }
        }

        return .city
    }

    // MARK: - Geocoding

    func geocodeLocation(_ query: String) async throws -> LocationData? {
        let searchType = detectSearchType(query)
        var searchQuery = query.trimmingCharacters(in: .whitespacesAndNewlines)

        // If it's an airport code, convert to city name
        if searchType == .airport {
            if let airport = AirportCodes.lookup(query.uppercased()) {
                searchQuery = "\(airport.city), \(airport.country)"
            }
        }

        // If it's a zip code, append US
        if searchType == .zip {
            searchQuery = "\(query), US"
        }

        guard let encodedQuery = searchQuery.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
              let url = URL(string: "https://geocoding-api.open-meteo.com/v1/search?name=\(encodedQuery)&count=1&language=en&format=json") else {
            return nil
        }

        let (data, _) = try await URLSession.shared.data(from: url)
        let response = try JSONDecoder().decode(GeocodingResponse.self, from: data)

        guard let result = response.results?.first else {
            return nil
        }

        return LocationData(
            name: result.name,
            country: result.country,
            latitude: result.latitude,
            longitude: result.longitude,
            timezone: result.timezone
        )
    }

    // MARK: - Weather Fetching

    func fetchWeather(latitude: Double, longitude: Double, timezone: String) async throws -> WeatherData? {
        guard let encodedTimezone = timezone.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
              let url = URL(string: "https://api.open-meteo.com/v1/forecast?latitude=\(latitude)&longitude=\(longitude)&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=\(encodedTimezone)&forecast_days=7") else {
            return nil
        }

        let (data, _) = try await URLSession.shared.data(from: url)
        let response = try JSONDecoder().decode(WeatherResponse.self, from: data)

        let daily = zip(response.daily.time, zip(response.daily.weather_code, zip(response.daily.temperature_2m_max, response.daily.temperature_2m_min)))
            .map { date, data in
                let (code, temps) = data
                let (high, low) = temps
                return DailyForecast(
                    date: date,
                    high: Int(high.rounded()),
                    low: Int(low.rounded()),
                    weatherCode: code
                )
            }

        return WeatherData(
            temperature: Int(response.current.temperature_2m.rounded()),
            feelsLike: Int(response.current.apparent_temperature.rounded()),
            humidity: response.current.relative_humidity_2m,
            windSpeed: Int(response.current.wind_speed_10m.rounded()),
            weatherCode: response.current.weather_code,
            description: WeatherDescription.description(for: response.current.weather_code),
            high: Int(response.daily.temperature_2m_max[0].rounded()),
            low: Int(response.daily.temperature_2m_min[0].rounded()),
            precipitation: response.current.precipitation,
            daily: daily
        )
    }

    // MARK: - Combined Search

    func searchCity(_ query: String) async throws -> CityData? {
        guard let location = try await geocodeLocation(query) else {
            return nil
        }

        let weather = try await fetchWeather(
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone
        )

        return CityData(
            location: location,
            weather: weather,
            searchQuery: query
        )
    }
}

// MARK: - Weather Descriptions

struct WeatherDescription {
    static func description(for code: Int) -> String {
        switch code {
        case 0: return "Clear sky"
        case 1: return "Mainly clear"
        case 2: return "Partly cloudy"
        case 3: return "Overcast"
        case 45: return "Foggy"
        case 48: return "Depositing rime fog"
        case 51: return "Light drizzle"
        case 53: return "Moderate drizzle"
        case 55: return "Dense drizzle"
        case 61: return "Slight rain"
        case 63: return "Moderate rain"
        case 65: return "Heavy rain"
        case 66: return "Light freezing rain"
        case 67: return "Heavy freezing rain"
        case 71: return "Slight snow"
        case 73: return "Moderate snow"
        case 75: return "Heavy snow"
        case 77: return "Snow grains"
        case 80: return "Slight rain showers"
        case 81: return "Moderate rain showers"
        case 82: return "Violent rain showers"
        case 85: return "Slight snow showers"
        case 86: return "Heavy snow showers"
        case 95: return "Thunderstorm"
        case 96: return "Thunderstorm with slight hail"
        case 99: return "Thunderstorm with heavy hail"
        default: return "Unknown"
        }
    }
}
