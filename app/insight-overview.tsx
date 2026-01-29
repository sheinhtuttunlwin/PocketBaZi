import { BaziChart } from '@/components/bazi-chart';
import { ThemedText } from '@/components/themed-text';
import { useBaziBundle } from '@/src/features/bazi/use-bazi-bundle';
import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

export default function InsightOverviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bundle, loading, error } = useBaziBundle();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.headerTitle}>
          Your Chart Overview
        </ThemedText>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentInner, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COBALT} />
            <ThemedText style={styles.loadingText}>Loading your chart...</ThemedText>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
          </View>
        )}

        {bundle && (
          <>
            {/* Chart Card */}
            <View style={styles.section}>
              <BaziChart
                chartData={bundle.chart}
                birthDate={bundle.input.birthDate}
                gender={bundle.input.gender}
              />
            </View>

            {/* Day Master Section */}
            {bundle.chart.dayMaster && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  🎯 Your Day Master
                </ThemedText>
                <View style={styles.card}>
                  <ThemedText style={styles.dayMasterText}>
                    Your Day Master is <ThemedText style={styles.dayMasterValue}>{bundle.chart.dayMaster}</ThemedText>
                  </ThemedText>
                  <ThemedText style={styles.bodyText}>
                    The Day Master represents your core self—your inherent nature, strengths, and the way you naturally interact with the world around you.
                  </ThemedText>
                </View>
              </View>
            )}

            {/* Interpretation Section */}
            {bundle.interpretation && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  📖 Chart Interpretation
                </ThemedText>
                <View style={styles.card}>
                  <ThemedText style={styles.bodyText}>{bundle.interpretation}</ThemedText>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: LINE_LIGHT,
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: COBALT,
  },
  headerTitle: {
    fontSize: 24,
    color: COBALT,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 24,
    gap: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 15,
    color: '#666',
  },
  errorContainer: {
    padding: 24,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#dc2626',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    color: COBALT,
  },
  card: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 14,
    padding: 20,
    backgroundColor: '#fff',
    gap: 12,
  },
  dayMasterText: {
    fontSize: 16,
    lineHeight: 24,
  },
  dayMasterValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COBALT,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },
});
