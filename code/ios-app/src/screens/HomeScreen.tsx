import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!origin && !destination) return;

    navigation.navigate('WeatherResults', {
      originQuery: origin.trim() || undefined,
      destinationQuery: destination.trim() || undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Section */}
          <View style={styles.hero}>
            <View style={styles.iconRow}>
              <Ionicons name="airplane" size={40} color={colors.primary} />
            </View>
            <Text style={styles.title}>Weather & Travel Planner</Text>
            <Text style={styles.subtitle}>
              Search by city name, zip code, or airport code to compare weather
              and find the perfect accommodations.
            </Text>
          </View>

          {/* Search Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="location"
                size={20}
                color={colors.gray[400]}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Origin (city, zip, or airport)"
                placeholderTextColor={colors.gray[400]}
                value={origin}
                onChangeText={setOrigin}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="airplane"
                size={20}
                color={colors.gray[400]}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Destination (city, zip, or airport)"
                placeholderTextColor={colors.gray[400]}
                value={destination}
                onChangeText={setDestination}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.searchButton,
                (!origin && !destination) && styles.searchButtonDisabled,
              ]}
              onPress={handleSearch}
              disabled={!origin && !destination}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Ionicons name="search" size={20} color={colors.white} />
                  <Text style={styles.searchButtonText}>
                    Search Weather & Travel Info
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.hint}>
              Try: "NYC", "90210", "LAX", "London", "Paris CDG"
            </Text>
          </View>

          {/* Feature Cards */}
          <View style={styles.features}>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🌍</Text>
              <Text style={styles.featureTitle}>Search Flexibly</Text>
              <Text style={styles.featureDesc}>
                Use city names, zip codes, or airport codes like LAX, JFK, or CDG
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🌤️</Text>
              <Text style={styles.featureTitle}>Compare Weather</Text>
              <Text style={styles.featureDesc}>
                See current conditions and 7-day forecasts for both locations
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🏨</Text>
              <Text style={styles.featureTitle}>Find Stays & Activities</Text>
              <Text style={styles.featureDesc}>
                Direct links to Airbnb, hotels, restaurants, and attractions
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
  hero: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.orange[50],
    alignItems: 'center',
  },
  iconRow: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  form: {
    padding: spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginLeft: spacing.md,
  },
  input: {
    flex: 1,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.gray[900],
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  searchButtonDisabled: {
    backgroundColor: colors.gray[300],
  },
  searchButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: spacing.md,
  },
  features: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  featureCard: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  featureEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  featureDesc: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    lineHeight: 20,
  },
});
