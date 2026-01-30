# Weather & Travel - Native iOS App

A native iOS app built with Swift and SwiftUI for planning travel with weather comparison and accommodation links.

## Features

- **City Search**: Search by city name, zip code, or airport code (80+ airports supported)
- **Weather Comparison**: View current weather and 7-day forecasts for origin and destination
- **Accommodations**: Direct links to Airbnb, Booking.com, Hotels.com, VRBO, Expedia, TripAdvisor
- **Things to Do**: Links to Yelp, Google Maps, Viator, GetYourGuide, and TripAdvisor

## Requirements

- Xcode 15.0+
- iOS 17.0+
- Swift 5.9+

## Getting Started

### Open in Xcode

1. Open `WeatherTravel.xcodeproj` in Xcode
2. Select your target device or simulator
3. Press `Cmd + R` to build and run

### Project Structure

```
WeatherTravel/
├── WeatherTravel.xcodeproj    # Xcode project file
└── WeatherTravel/
    ├── WeatherTravelApp.swift # App entry point
    ├── ContentView.swift      # Root view with navigation
    ├── Models/
    │   ├── LocationData.swift   # Location and geocoding models
    │   ├── WeatherData.swift    # Weather data models
    │   ├── AirportCodes.swift   # 80+ airport codes database
    │   └── ExternalLinks.swift  # Accommodation/activity links
    ├── Views/
    │   ├── HomeView.swift           # Search form
    │   ├── WeatherResultsView.swift # Weather comparison
    │   ├── AccommodationsView.swift # Hotel/Airbnb links
    │   └── ThingsToDoView.swift     # Activities links
    ├── ViewModels/
    │   └── SearchViewModel.swift    # Search logic and state
    ├── Services/
    │   └── WeatherService.swift     # API calls (Open-Meteo)
    └── Assets.xcassets/             # App icons and colors
```

## Architecture

- **MVVM Pattern**: Views observe ViewModels for state changes
- **Swift Concurrency**: Uses `async/await` and `actor` for safe concurrent operations
- **SwiftUI Navigation**: NavigationStack for type-safe navigation
- **No External Dependencies**: Pure Swift/SwiftUI implementation

## APIs Used

- **Open-Meteo Geocoding API**: Free geocoding service (no API key required)
- **Open-Meteo Weather API**: Free weather data with 7-day forecasts

## Screenshots

The app includes:
- Home screen with search inputs for origin/destination
- Weather comparison view with current conditions and 7-day forecast
- Accommodations list with links to booking sites
- Things to do list with links to activity sites

## Customization

### Changing the Accent Color

Edit `Assets.xcassets/AccentColor.colorset/Contents.json` to change the brand color (currently set to #D44400).

### Adding More Airports

Edit `Models/AirportCodes.swift` to add more airport codes to the lookup dictionary.

## Building for Release

1. Select "Any iOS Device" as the build target
2. Product → Archive
3. Distribute through App Store Connect or export for Ad Hoc distribution

## License

Part of the clifton.tv project.
