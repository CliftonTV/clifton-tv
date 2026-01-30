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
import { getAccommodationLinks } from '../utils/api';
import { RootStackParamList } from '../../App';
import LinkCard from '../components/LinkCard';

type RouteProps = RouteProp<RootStackParamList, 'Accommodations'>;

export default function AccommodationsScreen() {
  const route = useRoute<RouteProps>();
  const { city, country } = route.params;
  const links = getAccommodationLinks(city, country);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Stay in {city}</Text>
          <Text style={styles.subtitle}>
            Find the perfect place to stay during your trip
          </Text>
        </View>

        <View style={styles.links}>
          <LinkCard
            title="Airbnb"
            subtitle="Unique homes & experiences"
            url={links.airbnb}
            icon="home"
            brandColor={colors.airbnb}
          />

          <LinkCard
            title="Booking.com"
            subtitle="Hotels & apartments"
            url={links.booking}
            icon="bed"
            brandColor={colors.booking}
          />

          <LinkCard
            title="Hotels.com"
            subtitle="Earn free nights"
            url={links.hotels}
            icon="business"
            brandColor={colors.hotels}
          />

          <LinkCard
            title="VRBO"
            subtitle="Vacation rentals"
            url={links.vrbo}
            icon="home"
            brandColor={colors.vrbo}
          />

          <LinkCard
            title="Expedia"
            subtitle="Bundle & save"
            url={links.expedia}
            icon="globe"
            brandColor="#CC9900"
          />

          <LinkCard
            title="TripAdvisor"
            subtitle="Reviews & deals"
            url={links.tripadvisor}
            icon="star"
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
