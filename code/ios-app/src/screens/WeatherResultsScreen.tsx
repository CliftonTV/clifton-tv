import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { CityData } from '../utils/types';
import { geocodeLocation, fetchWeather } from '../utils/api';
import { RootStackParamList } from '../../App';
import WeatherCard from '../components/WeatherCard';

type RouteProps = RouteProp<RootStackParamList, 'WeatherResults'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WeatherResultsScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { originQuery, destinationQuery } = route.params;

  const [originData, setOriginData] = useState<CityData | null>(null);
  const [destinationData, setDestinationData] = useState<CityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [originQuery, destinationQuery]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const promises: Promise<void>[] = [];

      if (originQuery) {
        promises.push(loadCityData(originQuery, 'origin'));
      }

      if (destinationQuery) {
        promises.push(loadCityData(destinationQuery, 'destination'));
      }

      await Promise.all(promises);
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCityData = async (query: string, type: 'origin' | 'destination') => {
    const location = await geocodeLocation(query);
    if (!location) {
      setError(`Could not find location: ${query}`);
      return;
    }

    const weather = await fetchWeather(
      location.latitude,
      location.longitude,
      location.timezone
    );

    const cityData: CityData = {
      location,
      weather,
      searchQuery: query,
    };

    if (type === 'origin') {
      setOriginData(cityData);
    } else {
      setDestinationData(cityData);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Fetching weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={colors.red[500]} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadData}
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {originData && <WeatherCard data={originData} type="origin" />}
        {destinationData && <WeatherCard data={destinationData} type="destination" />}

        {/* Action Buttons for Destination */}
        {destinationData && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate('Accommodations', {
                  city: destinationData.location.name,
                  country: destinationData.location.country,
                })
              }
              activeOpacity={0.8}
            >
              <Ionicons name="bed" size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Find Accommodations</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={() =>
                navigation.navigate('ThingsToDo', {
                  city: destinationData.location.name,
                  country: destinationData.location.country,
                })
              }
              activeOpacity={0.8}
            >
              <Ionicons name="compass" size={24} color={colors.primary} />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Things to Do
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.gray[600],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.xl,
  },
  errorText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.gray[600],
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  actionButtons: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  actionButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    color: colors.primary,
  },
});
