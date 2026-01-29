import { ThemedText } from '@/components/themed-text';
import { useBaziBundle } from '@/src/features/bazi/use-bazi-bundle';
import { profileRepo } from '@/src/features/profile/profile-repo-instance';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';
const ACCENT = '#1d4ed8';

type InsightCardData = {
  id: string;
  title: string;
  icon: string;
  description: string;
  route: string;
};

const INSIGHT_CARDS: InsightCardData[] = [
  {
    id: 'overview',
    title: 'Your Chart Overview',
    icon: '📊',
    description: 'Understand your core BaZi chart and Day Master',
    route: '/insight-overview',
  },
  {
    id: 'patterns',
    title: 'Key Patterns in Your Chart',
    icon: '🔍',
    description: 'Discover interactions and relationships between pillars',
    route: '/insight-patterns',
  },
  {
    id: 'guidance',
    title: 'How to Work With Your Energy',
    icon: '⚡',
    description: 'Practical guidance based on your Day Master',
    route: '/insight-guidance',
  },
];

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [noProfile, setNoProfile] = useState(false);
  const { bundle, loading, error } = useBaziBundle();

  useFocusEffect(
    useCallback(() => {
      const checkProfile = async () => {
        const profile = await profileRepo.getProfile();
        setNoProfile(!profile);
      };
      checkProfile();
    }, [])
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <View style={styles.hero}>
        <ThemedText type="title" style={styles.welcome}>
          Insights
        </ThemedText>
        <ThemedText style={styles.subtitle}>Personal insights based on your chart</ThemedText>
      </View>

      <View style={styles.sheet}>
        {/* No Profile State */}
        {noProfile && (
          <View style={styles.emptyStateContainer}>
            <ThemedText type="subtitle" style={styles.emptyStateTitle}>
              No Profile Set Up
            </ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Create your profile to see personalized insights.
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.push('/profile-setup')}
              style={styles.emptyStateButton}
            >
              <ThemedText style={styles.emptyStateButtonText}>Create Profile</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading State */}
        {!noProfile && loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COBALT} />
            <ThemedText style={styles.loadingText}>Loading insights...</ThemedText>
          </View>
        )}

        {/* Error State */}
        {!noProfile && error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
          </View>
        )}

        {/* Insight Cards */}
        {!noProfile && bundle && (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {INSIGHT_CARDS.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={styles.insightCard}
                onPress={() => router.push(card.route as any)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <ThemedText style={styles.cardIcon}>{card.icon}</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                    {card.title}
                  </ThemedText>
                </View>
                <ThemedText style={styles.cardDescription}>{card.description}</ThemedText>
                <View style={styles.cardFooter}>
                  <ThemedText style={styles.readMore}>Read more →</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COBALT },
  hero: { paddingHorizontal: 24, paddingBottom: 16 },
  welcome: { color: '#fff', marginBottom: 4 },
  subtitle: { color: '#93b5ff', fontSize: 15 },
  sheet: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 22,
    marginBottom: 12,
    color: COBALT,
  },
  emptyStateText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: COBALT,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 15,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#dc2626',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 16,
  },
  insightCard: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 14,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 32,
    lineHeight: 40,
  },
  cardTitle: {
    fontSize: 18,
    flex: 1,
    color: COBALT,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  readMore: {
    fontSize: 14,
    color: ACCENT,
    fontWeight: '600',
  },
});
