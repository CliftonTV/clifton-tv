import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { CityData } from '../utils/types';
import { formatDay } from '../utils/api';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  data: CityData;
  type: 'origin' | 'destination';
}

export default function WeatherCard({ data, type }: WeatherCardProps) {
  const isDestination = type === 'destination';
  const accentColor = isDestination ? colors.primary : colors.blue[500];
  const bgColor = isDestination ? colors.orange[50] : colors.blue[50];

  return (
    <View style={[styles.card, { borderColor: accentColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <View style={styles.headerLabel}>
          <Ionicons
            name={isDestination ? 'airplane' : 'location'}
            size={16}
            color={accentColor}
          />
          <Text style={[styles.labelText, { color: accentColor }]}>
            {isDestination ? 'DESTINATION' : 'ORIGIN'}
          </Text>
        </View>
        <Text style={styles.cityName}>
          {data.location.name}, {data.location.country}
        </Text>
        <Text style={styles.searchQuery}>Searched: {data.searchQuery}</Text>
      </View>

      {/* Weather Content */}
      {data.weather && (
        <View style={styles.content}>
          {/* Current Weather */}
          <View style={styles.currentWeather}>
            <View style={styles.weatherMain}>
              <WeatherIcon code={data.weather.weatherCode} size={64} />
              <View style={styles.tempContainer}>
                <Text style={styles.temperature}>{data.weather.temperature}°C</Text>
                <Text style={styles.description}>{data.weather.description}</Text>
              </View>
            </View>
            <View style={styles.tempRange}>
              <Text style={styles.highLow}>
                H: {data.weather.high}° L: {data.weather.low}°
              </Text>
              <Text style={styles.feelsLike}>
                Feels like {data.weather.feelsLike}°C
              </Text>
            </View>
          </View>

          {/* Weather Details */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="water" size={20} color={colors.blue[500]} />
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{data.weather.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="flag" size={20} color={colors.blue[500]} />
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{data.weather.windSpeed} km/h</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="rainy" size={20} color={colors.blue[500]} />
              <Text style={styles.detailLabel}>Precip</Text>
              <Text style={styles.detailValue}>{data.weather.precipitation} mm</Text>
            </View>
          </View>

          {/* 7-Day Forecast */}
          <View style={styles.forecastSection}>
            <Text style={styles.forecastTitle}>7-Day Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.weather.daily.map((day, i) => (
                <View
                  key={day.date}
                  style={[
                    styles.forecastDay,
                    { backgroundColor: i === 0 ? bgColor : colors.gray[50] },
                  ]}
                >
                  <Text style={styles.dayName}>{formatDay(day.date)}</Text>
                  <WeatherIcon code={day.weatherCode} size={24} />
                  <View style={styles.forecastTemp}>
                    <Text style={styles.forecastHigh}>{day.high}°</Text>
                    <Text style={styles.forecastLow}>{day.low}°</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: spacing.md,
  },
  headerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  labelText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
  },
  cityName: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  searchQuery: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
  content: {
    padding: spacing.md,
  },
  currentWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tempContainer: {
    marginLeft: spacing.sm,
  },
  temperature: {
    fontSize: fontSize.display,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  description: {
    fontSize: fontSize.md,
    color: colors.gray[500],
  },
  tempRange: {
    alignItems: 'flex-end',
  },
  highLow: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
  },
  feelsLike: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  detailItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailLabel: {
    fontSize: fontSize.xs,
    color: colors.gray[500],
  },
  detailValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.gray[900],
  },
  forecastSection: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: spacing.md,
  },
  forecastTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  forecastDay: {
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
    minWidth: 64,
  },
  dayName: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  forecastTemp: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  forecastHigh: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.gray[900],
  },
  forecastLow: {
    fontSize: fontSize.xs,
    color: colors.gray[400],
  },
});
