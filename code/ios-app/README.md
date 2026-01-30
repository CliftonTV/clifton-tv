# Weather & Travel iOS App

A React Native (Expo) iOS app for planning travel with weather comparison and accommodation links.

## Features

- **City Search**: Search by city name, zip code, or airport code (80+ airports supported)
- **Weather Comparison**: View current weather and 7-day forecasts for origin and destination
- **Accommodations**: Direct links to Airbnb, Booking.com, Hotels.com, VRBO, Expedia, TripAdvisor
- **Things to Do**: Links to Yelp, Google Maps, Viator, GetYourGuide, and TripAdvisor

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS simulator) or Expo Go app on your iPhone

### Installation

```bash
cd ios-app
npm install
```

### Running the App

```bash
# Start the Expo development server
npm start

# Run on iOS simulator
npm run ios
```

Or scan the QR code with Expo Go on your iPhone.

## Project Structure

```
ios-app/
├── App.tsx                 # Main app with navigation
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── src/
│   ├── components/
│   │   ├── WeatherCard.tsx    # Weather display card
│   │   ├── WeatherIcon.tsx    # Weather condition icons
│   │   └── LinkCard.tsx       # Tappable link cards
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Search form
│   │   ├── WeatherResultsScreen.tsx # Weather comparison
│   │   ├── AccommodationsScreen.tsx # Hotel/Airbnb links
│   │   └── ThingsToDoScreen.tsx     # Activities links
│   ├── constants/
│   │   ├── airports.ts    # Airport code database
│   │   └── theme.ts       # Colors, spacing, typography
│   └── utils/
│       ├── api.ts         # API functions (Open-Meteo)
│       └── types.ts       # TypeScript interfaces
└── assets/               # App icons and splash screen
```

## APIs Used

- **Open-Meteo Geocoding API**: Free geocoding service
- **Open-Meteo Weather API**: Free weather data (no API key required)

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for iOS
eas build --platform ios
```

## Tech Stack

- React Native with Expo SDK 50
- TypeScript
- React Navigation 6
- Expo Web Browser (for opening external links)
- @expo/vector-icons (Ionicons)
