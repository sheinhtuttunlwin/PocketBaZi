import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

export default function LearnStemsBranchesScreen() {
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
          Stems & Branches
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
              The Heavenly Stems (天干) and Earthly Branches (地支) are the building blocks of the Chinese calendar system and form the foundation of your BaZi chart.
            </ThemedText>
          </View>
        </View>

        {/* Heavenly Stems */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            ☁️ Heavenly Stems (天干)
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              There are 10 Heavenly Stems, representing celestial energies. Each stem has:
            </ThemedText>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>An elemental nature (Wood, Fire, Earth, Metal, Water)</ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>A polarity (Yang or Yin)</ThemedText>
            </View>

            <View style={styles.stemTable}>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>甲 (Jia)</ThemedText>
                <ThemedText style={styles.tableCell}>Yang Wood</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>乙 (Yi)</ThemedText>
                <ThemedText style={styles.tableCell}>Yin Wood</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>丙 (Bing)</ThemedText>
                <ThemedText style={styles.tableCell}>Yang Fire</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>丁 (Ding)</ThemedText>
                <ThemedText style={styles.tableCell}>Yin Fire</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>戊 (Wu)</ThemedText>
                <ThemedText style={styles.tableCell}>Yang Earth</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>己 (Ji)</ThemedText>
                <ThemedText style={styles.tableCell}>Yin Earth</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>庚 (Geng)</ThemedText>
                <ThemedText style={styles.tableCell}>Yang Metal</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>辛 (Xin)</ThemedText>
                <ThemedText style={styles.tableCell}>Yin Metal</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>壬 (Ren)</ThemedText>
                <ThemedText style={styles.tableCell}>Yang Water</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>癸 (Gui)</ThemedText>
                <ThemedText style={styles.tableCell}>Yin Water</ThemedText>
              </View>
            </View>

            <ThemedText style={styles.bodyText}>
              Stems represent visible, active, and external energies—what others see in you.
            </ThemedText>
          </View>
        </View>

        {/* Earthly Branches */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🌏 Earthly Branches (地支)
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              There are 12 Earthly Branches, representing terrestrial energies. Each branch:
            </ThemedText>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>Corresponds to an animal in the Chinese zodiac</ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>Contains hidden stems (underlying energies)</ThemedText>
            </View>
            <View style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.listText}>Represents months and years in the calendar</ThemedText>
            </View>

            <View style={styles.stemTable}>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>子 (Zi)</ThemedText>
                <ThemedText style={styles.tableCell}>Rat</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>丑 (Chou)</ThemedText>
                <ThemedText style={styles.tableCell}>Ox</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>寅 (Yin)</ThemedText>
                <ThemedText style={styles.tableCell}>Tiger</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>卯 (Mao)</ThemedText>
                <ThemedText style={styles.tableCell}>Rabbit</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>辰 (Chen)</ThemedText>
                <ThemedText style={styles.tableCell}>Dragon</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>巳 (Si)</ThemedText>
                <ThemedText style={styles.tableCell}>Snake</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>午 (Wu)</ThemedText>
                <ThemedText style={styles.tableCell}>Horse</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>未 (Wei)</ThemedText>
                <ThemedText style={styles.tableCell}>Goat</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>申 (Shen)</ThemedText>
                <ThemedText style={styles.tableCell}>Monkey</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>酉 (You)</ThemedText>
                <ThemedText style={styles.tableCell}>Rooster</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>戌 (Xu)</ThemedText>
                <ThemedText style={styles.tableCell}>Dog</ThemedText>
              </View>
              <View style={styles.tableRow}>
                <ThemedText style={styles.tableCell}>亥 (Hai)</ThemedText>
                <ThemedText style={styles.tableCell}>Pig</ThemedText>
              </View>
            </View>

            <ThemedText style={styles.bodyText}>
              Branches represent hidden, internal, and foundational energies—your underlying nature.
            </ThemedText>
          </View>
        </View>

        {/* How They Work Together */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🔗 How They Work Together
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              Each of your Four Pillars (Year, Month, Day, Hour) contains one stem and one branch, creating a pair called a "pillar."
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Example:</ThemedText> 甲子 (Jia-Zi) combines Yang Wood stem with Rat branch.
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              The stem-branch combinations cycle through in a 60-year pattern called the "Sexagenary Cycle," which has been used for thousands of years to record time in the Chinese calendar.
            </ThemedText>
          </View>
        </View>

        {/* In Practice */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            💡 In Your Chart
          </ThemedText>
          <View style={styles.card}>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Stems</ThemedText> show how you express yourself outwardly—your visible personality and actions.
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              <ThemedText style={styles.bold}>Branches</ThemedText> reveal your inner world—hidden talents, emotions, and unconscious patterns.
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              Together, they create a complete picture of who you are and how you interact with the world.
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
  bold: {
    fontWeight: '600',
    color: COBALT,
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
  stemTable: {
    gap: 4,
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(30, 58, 138, 0.04)',
    borderRadius: 6,
  },
  tableCell: {
    fontSize: 14,
    color: '#444',
  },
});
