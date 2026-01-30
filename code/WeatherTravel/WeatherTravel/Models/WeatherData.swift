import Foundation

struct WeatherData: Codable {
    let temperature: Int
    let feelsLike: Int
    let humidity: Int
    let windSpeed: Int
    let weatherCode: Int
    let description: String
    let high: Int
    let low: Int
    let precipitation: Double
    let daily: [DailyForecast]
}

struct DailyForecast: Identifiable, Codable {
    var id: String { date }
    let date: String
    let high: Int
    let low: Int
    let weatherCode: Int

    var dayName: String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        guard let date = dateFormatter.date(from: date) else { return "" }

        let calendar = Calendar.current
        if calendar.isDateInToday(date) {
            return "Today"
        } else if calendar.isDateInTomorrow(date) {
            return "Tomorrow"
        } else {
            let dayFormatter = DateFormatter()
            dayFormatter.dateFormat = "EEE"
            return dayFormatter.string(from: date)
        }
    }
}

struct CityData: Identifiable {
    var id: String { location.id }
    let location: LocationData
    let weather: WeatherData?
    let searchQuery: String
}

// API Response Models
struct WeatherResponse: Codable {
    let current: CurrentWeather
    let daily: DailyWeather
}

struct CurrentWeather: Codable {
    let temperature_2m: Double
    let relative_humidity_2m: Int
    let apparent_temperature: Double
    let precipitation: Double
    let weather_code: Int
    let wind_speed_10m: Double
}

struct DailyWeather: Codable {
    let time: [String]
    let weather_code: [Int]
    let temperature_2m_max: [Double]
    let temperature_2m_min: [Double]
}
