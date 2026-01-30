import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

export default function LearnFiveElementsScreen() {
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
          The Five Elements
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
              The Five Elements—Wood (木), Fire (火), Earth (土), Metal (金), and Water (水)—are the foundation of Chinese metaphysics. They represent fundamental energies that interact, support, and challenge each other.
            </ThemedText>
          </View>
        </View>

        {/* Wood */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🌳 Wood (木)
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.elementSubtitle}>
              Season: Spring | Direction: East | Color: Green
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Nature:</ThemedText> Growth, expansion, flexibility, vitality
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Qualities:</ThemedText> Creative, pioneering, optimistic, upward-moving
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Generates:</ThemedText> Fire (wood feeds fire)
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Controls:</ThemedText> Earth (wood penetrates earth)
            </ThemedText>
          </View>
        </View>

        {/* Fire */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🔥 Fire (火)
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.elementSubtitle}>
              Season: Summer | Direction: South | Color: Red
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Nature:</ThemedText> Expansion, warmth, transformation, illumination
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Qualities:</ThemedText> Passionate, dynamic, expressive, radiating
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Generates:</ThemedText> Earth (fire creates ash/earth)
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Controls:</ThemedText> Metal (fire melts metal)
            </ThemedText>
          </View>
        </View>

        {/* Earth */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🏔️ Earth (土)
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.elementSubtitle}>
              Season: Late Summer | Direction: Center | Color: Yellow
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Nature:</ThemedText> Stability, nourishment, grounding, transition
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Qualities:</ThemedText> Reliable, patient, supportive, centering
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Generates:</ThemedText> Metal (earth contains metal ore)
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Controls:</ThemedText> Water (earth dams water)
            </ThemedText>
          </View>
        </View>

        {/* Metal */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            ⚔️ Metal (金)
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.elementSubtitle}>
              Season: Autumn | Direction: West | Color: White
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Nature:</ThemedText> Contraction, structure, precision, clarity
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Qualities:</ThemedText> Decisive, organized, refined, inward-moving
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Generates:</ThemedText> Water (metal condenses water)
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Controls:</ThemedText> Wood (metal cuts wood)
            </ThemedText>
          </View>
        </View>

        {/* Water */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            💧 Water (水)
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.elementSubtitle}>
              Season: Winter | Direction: North | Color: Black/Blue
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Nature:</ThemedText> Flow, wisdom, adaptability, depth
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Qualities:</ThemedText> Intuitive, flexible, reflective, downward-moving
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Generates:</ThemedText> Wood (water nourishes wood)
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Controls:</ThemedText> Fire (water extinguishes fire)
            </ThemedText>
          </View>
        </View>

        {/* Cycles */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            ♻️ The Elemental Cycles
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Generating Cycle (支持):</ThemedText>
            </ThemedText>
            <ThemedText style={styles.cycleText}>
              Wood → Fire → Earth → Metal → Water → Wood
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              Each element supports and nourishes the next.
            </ThemedText>

            <View style={styles.divider} />

            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Controlling Cycle (控制):</ThemedText>
            </ThemedText>
            <ThemedText style={styles.cycleText}>
              Wood → Earth → Water → Fire → Metal → Wood
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              Each element controls or checks another to maintain balance.
            </ThemedText>
          </View>
        </View>

        {/* Application */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🎯 In Your Chart
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              In BaZi, these elements interact within your chart to reveal your strengths, challenges, and how you can achieve balance. Elements that support your Day Master are favorable, while those that control it can present challenges—though both are necessary for growth.
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
  elementSubtitle: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },
  bold: {
    fontWeight: '600',
    color: COBALT,
  },
  cycleText: {
    fontSize: 15,
    fontWeight: '600',
    color: COBALT,
    textAlign: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: LINE_LIGHT,
    marginVertical: 4,
  },
});
