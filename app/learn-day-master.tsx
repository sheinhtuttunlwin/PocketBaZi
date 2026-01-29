import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

export default function LearnDayMasterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.headerTitle}>
          What is a Day Master?
        </ThemedText>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentInner, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.section}>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              The Day Master (日主) is the single most important element in your BaZi chart. It represents YOU—your core essence, personality, and how you naturally interact with the world.
            </ThemedText>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            📍 Where to Find It
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              The Day Master is the Heavenly Stem of your Day Pillar. In your Four Pillars chart, it's located in the third column (Day), top row (Heavenly Stem).
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              This celestial stem is determined by the exact day you were born in the Chinese calendar system.
            </ThemedText>
          </View>
        </View>

        {/* The 10 Day Masters */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🌟 The 10 Day Masters
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              There are 10 possible Day Masters, each representing a unique elemental energy:
            </ThemedText>
            <View style={styles.elementGroup}>
              <ThemedText style={styles.elementTitle}>🌳 Wood</ThemedText>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  甲 (Yang Wood) - The Mighty Tree: Strong, upright, leadership
                </ThemedText>
              </View>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  乙 (Yin Wood) - The Flexible Vine: Adaptable, graceful, persistent
                </ThemedText>
              </View>
            </View>

            <View style={styles.elementGroup}>
              <ThemedText style={styles.elementTitle}>🔥 Fire</ThemedText>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  丙 (Yang Fire) - The Sun: Radiant, optimistic, illuminating
                </ThemedText>
              </View>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  丁 (Yin Fire) - The Candle: Focused, refined, artistic
                </ThemedText>
              </View>
            </View>

            <View style={styles.elementGroup}>
              <ThemedText style={styles.elementTitle}>🏔️ Earth</ThemedText>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  戊 (Yang Earth) - The Mountain: Stable, reliable, protective
                </ThemedText>
              </View>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  己 (Yin Earth) - The Soil: Nurturing, patient, supportive
                </ThemedText>
              </View>
            </View>

            <View style={styles.elementGroup}>
              <ThemedText style={styles.elementTitle}>⚔️ Metal</ThemedText>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  庚 (Yang Metal) - The Sword: Strong-willed, decisive, honorable
                </ThemedText>
              </View>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  辛 (Yin Metal) - The Jewel: Refined, elegant, precise
                </ThemedText>
              </View>
            </View>

            <View style={styles.elementGroup}>
              <ThemedText style={styles.elementTitle}>💧 Water</ThemedText>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  壬 (Yang Water) - The Ocean: Vast, powerful, adaptable
                </ThemedText>
              </View>
              <View style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>
                  癸 (Yin Water) - The Rain: Gentle, perceptive, persistent
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Why It Matters */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            💡 Why It Matters
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              Understanding your Day Master helps you:
            </ThemedText>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Recognize your natural strengths and tendencies
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Work with your energy instead of against it
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Understand which elements support or challenge you
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Make decisions aligned with your nature
              </ThemedText>
            </View>
          </View>
        </View>
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
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },
  elementGroup: {
    gap: 8,
    paddingTop: 8,
  },
  elementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COBALT,
    marginBottom: 4,
  },
  listItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    fontSize: 15,
    color: COBALT,
    fontWeight: '600',
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },
});
