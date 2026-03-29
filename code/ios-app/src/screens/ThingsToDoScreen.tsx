import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSize } from '../constants/theme';
import { getThingsToDoLinks } from '../utils/api';
import { RootStackParamList } from '../../App';
import LinkCard from '../components/LinkCard';

type RouteProps = RouteProp<RootStackParamList, 'ThingsToDo'>;

export default function ThingsToDoScreen() {
  const route = useRoute<RouteProps>();
  const { city, country } = route.params;
  const links = getThingsToDoLinks(city, country);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Things to Do in {city}</Text>
          <Text style={styles.subtitle}>
            Discover restaurants, attractions, and experiences
          </Text>
        </View>

        <View style={styles.links}>
          <LinkCard
            title="Yelp"
            subtitle="Restaurants & services"
            url={links.yelp}
            icon="restaurant"
            brandColor={colors.yelp}
          />

          <LinkCard
            title="Google Maps"
            subtitle="Explore the area"
            url={links.googleMaps}
            icon="map"
            brandColor={colors.google}
          />

          <LinkCard
            title="Viator"
            subtitle="Tours & activities"
            url={links.viator}
            icon="camera"
            brandColor={colors.viator}
          />

          <LinkCard
            title="GetYourGuide"
            subtitle="Experiences & tickets"
            url={links.getYourGuide}
            icon="ticket"
            brandColor={colors.getYourGuide}
          />

          <LinkCard
            title="TripAdvisor Dining"
            subtitle="Top restaurants"
            url={links.tripadvisorDining}
            icon="cafe"
            brandColor={colors.tripadvisor}
          />

          <LinkCard
            title="TripAdvisor Attractions"
            subtitle="Things to see"
            url={links.tripadvisorAttractions}
            icon="camera"
            brandColor={colors.tripadvisor}
          />
        </View>
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
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  links: {
    gap: spacing.sm,
  },
});
