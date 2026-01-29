import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';
const ACCENT = '#1d4ed8';

type LearnCardData = {
  id: string;
  title: string;
  icon: string;
  description: string;
  route: string;
};

const LEARN_CARDS: LearnCardData[] = [
  {
    id: 'what-is-bazi',
    title: 'What is BaZi?',
    icon: '📚',
    description: 'An introduction to the ancient Chinese system of destiny analysis',
    route: '/learn-what-is-bazi',
  },
  {
    id: 'day-master',
    title: 'What is a Day Master?',
    icon: '🎯',
    description: 'Understanding the core of your BaZi chart',
    route: '/learn-day-master',
  },
  {
    id: 'five-elements',
    title: 'The Five Elements',
    icon: '🌊',
    description: 'Wood, Fire, Earth, Metal, and Water explained',
    route: '/learn-five-elements',
  },
  {
    id: 'stems-branches',
    title: 'Stems & Branches',
    icon: '🌳',
    description: 'The building blocks of the Chinese calendar',
    route: '/learn-stems-branches',
  },
];

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <View style={styles.hero}>
        <ThemedText type="title" style={styles.welcome}>
          Learn
        </ThemedText>
        <ThemedText style={styles.subtitle}>Educational Resources</ThemedText>
      </View>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {LEARN_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.learnCard}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 16,
  },
  learnCard: {
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
