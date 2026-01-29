import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

export default function LearnWhatIsBaziScreen() {
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
          What is BaZi?
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
              BaZi (八字), also known as "Four Pillars of Destiny," is an ancient Chinese metaphysical system used to analyze a person's destiny and character based on their birth date and time.
            </ThemedText>
          </View>
        </View>

        {/* Origin */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🏛️ Origin & History
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              BaZi has been practiced for over a thousand years in China and is rooted in the principles of Yin-Yang and the Five Elements (Wood, Fire, Earth, Metal, Water).
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              The system converts a person's birth information into four pillars—Year, Month, Day, and Hour—each represented by a Heavenly Stem and an Earthly Branch.
            </ThemedText>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            ⚙️ How It Works
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              Your birth date and time are converted into the Chinese calendar system, creating four pillars. Each pillar contains:
            </ThemedText>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                A Heavenly Stem (one of 10 celestial energies)
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                An Earthly Branch (one of 12 terrestrial energies)
              </ThemedText>
            </View>
            <ThemedText style={styles.bodyText}>
              These eight characters (four stems + four branches = 八字) form your unique energetic blueprint.
            </ThemedText>
          </View>
        </View>

        {/* What It Reveals */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🔮 What It Reveals
          </ThemedText>
          <View style={styles.card}>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Your core personality traits and natural tendencies
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Strengths, weaknesses, and growth areas
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Life cycles and timing of opportunities
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Compatibility with others and environments
              </ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>
                Career paths and relationship dynamics
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Modern Application */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🌟 Modern Application
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              Today, BaZi is used for self-discovery, personal development, and making informed life decisions. It provides a framework for understanding your natural inclinations and working with, rather than against, your inherent nature.
            </ThemedText>
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
