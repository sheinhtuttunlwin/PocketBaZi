import { ThemedText } from '@/components/themed-text';
import { useBaziBundle } from '@/src/features/bazi/use-bazi-bundle';
import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

type Interaction = {
  type: string;
  participants: Array<{
    pillar: string;
    source: string;
    elementChar: string;
    elementType: string;
  }>;
  location: string;
  description: string;
  involvesFavorableElement?: boolean;
  involvesUnfavorableElement?: boolean;
  consequenceNotes?: string[];
};

export default function InsightPatternsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bundle, loading, error } = useBaziBundle();

  const interactions: Interaction[] = (bundle?.chart?.raw as any)?.interactions || [];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.headerTitle}>
          Key Patterns in Your Chart
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
            <ThemedText style={styles.loadingText}>Analyzing patterns...</ThemedText>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
          </View>
        )}

        {bundle && (
          <>
            {/* Introduction */}
            <View style={styles.section}>
              <ThemedText style={styles.introText}>
                Interactions between pillars reveal how different aspects of your life influence each other. These patterns can highlight areas of harmony or tension in your chart.
              </ThemedText>
            </View>

            {/* Interactions */}
            {interactions.length > 0 ? (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  🔍 Detected Interactions
                </ThemedText>
                {interactions.map((interaction, index) => (
                  <View key={index} style={styles.interactionCard}>
                    <View style={styles.interactionHeader}>
                      <ThemedText type="defaultSemiBold" style={styles.interactionType}>
                        {formatInteractionType(interaction.type)}
                      </ThemedText>
                      {interaction.involvesFavorableElement && (
                        <View style={[styles.badge, styles.badgeFavorable]}>
                          <ThemedText style={styles.badgeText}>Favorable</ThemedText>
                        </View>
                      )}
                      {interaction.involvesUnfavorableElement && (
                        <View style={[styles.badge, styles.badgeUnfavorable]}>
                          <ThemedText style={styles.badgeText}>Challenge</ThemedText>
                        </View>
                      )}
                    </View>

                    <ThemedText style={styles.descriptionText}>
                      {interaction.description}
                    </ThemedText>

                    {/* Participants */}
                    <View style={styles.participantsContainer}>
                      {interaction.participants.map((p, i) => (
                        <View key={i} style={styles.participantChip}>
                          <ThemedText style={styles.participantText}>
                            {p.pillar} ({p.elementChar})
                          </ThemedText>
                        </View>
                      ))}
                    </View>

                    {/* Consequence Notes */}
                    {interaction.consequenceNotes && interaction.consequenceNotes.length > 0 && (
                      <View style={styles.notesContainer}>
                        {interaction.consequenceNotes.map((note, i) => (
                          <ThemedText key={i} style={styles.noteText}>
                            • {note}
                          </ThemedText>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.section}>
                <View style={styles.card}>
                  <ThemedText style={styles.bodyText}>
                    No major interactions detected in your chart. This suggests a relatively harmonious and straightforward energetic structure.
                  </ThemedText>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

function formatInteractionType(type: string): string {
  // Convert camelCase to Title Case with spaces
  return type
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
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
  introText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
  },
  card: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 14,
    padding: 20,
    backgroundColor: '#fff',
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },
  interactionCard: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#fff',
    gap: 12,
  },
  interactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  interactionType: {
    fontSize: 17,
    color: COBALT,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeFavorable: {
    backgroundColor: '#dcfce7',
  },
  badgeUnfavorable: {
    backgroundColor: '#fee2e2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  participantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantChip: {
    backgroundColor: 'rgba(30, 58, 138, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  participantText: {
    fontSize: 13,
    color: COBALT,
    fontWeight: '500',
  },
  notesContainer: {
    gap: 6,
    paddingTop: 4,
  },
  noteText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
});
