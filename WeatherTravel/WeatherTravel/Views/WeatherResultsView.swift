import SwiftUI

struct WeatherResultsView: View {
    @ObservedObject var viewModel: SearchViewModel

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                if let originData = viewModel.originData {
                    WeatherCard(data: originData, type: .origin)
                }

                if let destinationData = viewModel.destinationData {
                    WeatherCard(data: destinationData, type: .destination)

                    // Action Buttons
                    VStack(spacing: 12) {
                        NavigationLink(destination: AccommodationsView(
                            city: destinationData.location.name,
                            country: destinationData.location.country
                        )) {
                            HStack {
                                Image(systemName: "bed.double.fill")
                                Text("Find Accommodations")
                                    .fontWeight(.semibold)
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.accentColor)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                        }

                        NavigationLink(destination: ThingsToDoView(
                            city: destinationData.location.name,
                            country: destinationData.location.country
                        )) {
                            HStack {
                                Image(systemName: "map.fill")
                                Text("Things to Do")
                                    .fontWeight(.semibold)
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.white)
                            .foregroundColor(.accentColor)
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.accentColor, lineWidth: 2)
                            )
                            .cornerRadius(12)
                        }
                    }
                }
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle("Weather Comparison")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Weather Card

enum CardType {
    case origin
    case destination

    var label: String {
        switch self {
        case .origin: return "ORIGIN"
        case .destination: return "DESTINATION"
        }
    }

    var icon: String {
        switch self {
        case .origin: return "location.fill"
        case .destination: return "airplane"
        }
    }

    var accentColor: Color {
        switch self {
        case .origin: return .blue
        case .destination: return Color.accentColor
        }
    }

    var backgroundColor: Color {
        switch self {
        case .origin: return .blue.opacity(0.1)
        case .destination: return Color.accentColor.opacity(0.1)
        }
    }
}

struct WeatherCard: View {
    let data: CityData
    let type: CardType

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            VStack(alignment: .leading, spacing: 8) {
                HStack(spacing: 6) {
                    Image(systemName: type.icon)
                        .font(.caption)
                    Text(type.label)
                        .font(.caption)
                        .fontWeight(.semibold)
                        .tracking(1)
                }
                .foregroundColor(type.accentColor)

                Text(data.location.displayName)
                    .font(.title2)
                    .fontWeight(.bold)

                Text("Searched: \(data.searchQuery)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(type.backgroundColor)

            // Weather Content
            if let weather = data.weather {
                VStack(spacing: 20) {
                    // Current Weather
                    HStack {
                        HStack(spacing: 16) {
                            WeatherIconView(code: weather.weatherCode, size: 64)

                            VStack(alignment: .leading, spacing: 4) {
                                Text("\(weather.temperature)°C")
                                    .font(.system(size: 48, weight: .bold))
                                Text(weather.description)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                            }
                        }

                        Spacer()

                        VStack(alignment: .trailing, spacing: 4) {
                            Text("H: \(weather.high)° L: \(weather.low)°")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Text("Feels like \(weather.feelsLike)°C")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }

                    // Weather Details
                    HStack(spacing: 0) {
                        WeatherDetailItem(
                            icon: "humidity.fill",
                            label: "Humidity",
                            value: "\(weather.humidity)%",
                            color: .blue
                        )

                        WeatherDetailItem(
                            icon: "wind",
                            label: "Wind",
                            value: "\(weather.windSpeed) km/h",
                            color: .blue
                        )

                        WeatherDetailItem(
                            icon: "drop.fill",
                            label: "Precip",
                            value: String(format: "%.1f mm", weather.precipitation),
                            color: .blue
                        )
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)

                    // 7-Day Forecast
                    VStack(alignment: .leading, spacing: 12) {
                        Text("7-Day Forecast")
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .foregroundColor(.secondary)

                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 8) {
                                ForEach(Array(weather.daily.enumerated()), id: \.element.id) { index, day in
                                    ForecastDayView(
                                        day: day,
                                        isToday: index == 0,
                                        accentColor: type.backgroundColor
                                    )
                                }
                            }
                        }
                    }
                }
                .padding()
            }
        }
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(type.accentColor, lineWidth: 2)
        )
    }
}

// MARK: - Weather Icon View

struct WeatherIconView: View {
    let code: Int
    var size: CGFloat = 32

    var iconName: String {
        switch code {
        case 0, 1:
            return "sun.max.fill"
        case 2, 3:
            return "cloud.sun.fill"
        case 45, 48:
            return "cloud.fog.fill"
        case 51...67, 80...82:
            return "cloud.rain.fill"
        case 71...77, 85, 86:
            return "cloud.snow.fill"
        case 95...99:
            return "cloud.bolt.rain.fill"
        default:
            return "cloud.fill"
        }
    }

    var iconColor: Color {
        switch code {
        case 0, 1:
            return .yellow
        case 2, 3:
            return .gray
        case 45, 48:
            return .gray.opacity(0.7)
        case 51...67, 80...82:
            return .blue
        case 71...77, 85, 86:
            return .cyan
        case 95...99:
            return .purple
        default:
            return .gray
        }
    }

    var body: some View {
        Image(systemName: iconName)
            .font(.system(size: size))
            .foregroundColor(iconColor)
    }
}

// MARK: - Weather Detail Item

struct WeatherDetailItem: View {
    let icon: String
    let label: String
    let value: String
    let color: Color

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)

            Text(label)
                .font(.caption2)
                .foregroundColor(.secondary)

            Text(value)
                .font(.subheadline)
                .fontWeight(.semibold)
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Forecast Day View

struct ForecastDayView: View {
    let day: DailyForecast
    let isToday: Bool
    let accentColor: Color

    var body: some View {
        VStack(spacing: 8) {
            Text(day.dayName)
                .font(.caption)
                .fontWeight(.semibold)
                .foregroundColor(.secondary)

            WeatherIconView(code: day.weatherCode, size: 24)

            HStack(spacing: 4) {
                Text("\(day.high)°")
                    .font(.caption)
                    .fontWeight(.semibold)
                Text("\(day.low)°")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 12)
        .background(isToday ? accentColor : Color(.systemGray6))
        .cornerRadius(8)
    }
}

#Preview {
    NavigationStack {
        WeatherResultsView(viewModel: {
            let vm = SearchViewModel()
            return vm
        }())
    }
}
