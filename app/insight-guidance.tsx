import { ThemedText } from '@/components/themed-text';
import { useBaziBundle } from '@/src/features/bazi/use-bazi-bundle';
import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

// Element guidance mappings based on Day Master
const ELEMENT_GUIDANCE: Record<string, {
  element: string;
  nature: string;
  strengths: string[];
  challenges: string[];
  guidance: string[];
}> = {
  '甲': {
    element: 'Wood',
    nature: 'Yang Wood (甲) - The Mighty Tree',
    strengths: [
      'Natural leadership and pioneering spirit',
      'Growth-oriented and adaptable',
      'Strong moral compass and integrity',
      'Ability to inspire and uplift others',
    ],
    challenges: [
      'Can be inflexible or stubborn',
      'May struggle with compromise',
      'Tendency to take on too much',
      'Risk of overextending resources',
    ],
    guidance: [
      'Embrace flexibility while maintaining your core values',
      'Delegate and trust others to help you grow',
      'Balance ambition with self-care and rest',
      'Seek environments that allow you to flourish naturally',
    ],
  },
  '乙': {
    element: 'Wood',
    nature: 'Yin Wood (乙) - The Flexible Vine',
    strengths: [
      'Adaptable and resilient',
      'Creative problem-solving abilities',
      'Diplomatic and harmonious approach',
      'Strong intuition and sensitivity',
    ],
    challenges: [
      'May avoid direct confrontation',
      'Can be overly dependent on others',
      'Tendency to bend too much for others',
      'Risk of losing sense of self',
    ],
    guidance: [
      'Set healthy boundaries while remaining flexible',
      'Trust your intuition and creative insights',
      'Find supportive structures to grow around',
      'Balance accommodation with self-assertion',
    ],
  },
  '丙': {
    element: 'Fire',
    nature: 'Yang Fire (丙) - The Radiant Sun',
    strengths: [
      'Natural charisma and warmth',
      'Optimistic and enthusiastic',
      'Ability to illuminate and inspire',
      'Strong sense of justice',
    ],
    challenges: [
      'Can burn too bright and exhaust energy',
      'May be overly dramatic',
      'Tendency toward impatience',
      'Risk of overwhelming others',
    ],
    guidance: [
      'Manage your energy output sustainably',
      'Balance intensity with moments of calm',
      'Channel enthusiasm into meaningful projects',
      'Practice patience and listening',
    ],
  },
  '丁': {
    element: 'Fire',
    nature: 'Yin Fire (丁) - The Candle Flame',
    strengths: [
      'Focused and precise energy',
      'Creative and artistic talents',
      'Warm and nurturing presence',
      'Attention to detail and refinement',
    ],
    challenges: [
      'Can be sensitive to criticism',
      'May burn out if overextended',
      'Tendency toward perfectionism',
      'Risk of emotional volatility',
    ],
    guidance: [
      'Protect your energy and set boundaries',
      'Channel creativity into tangible outputs',
      'Build emotional resilience practices',
      'Accept imperfection as part of growth',
    ],
  },
  '戊': {
    element: 'Earth',
    nature: 'Yang Earth (戊) - The Mountain',
    strengths: [
      'Stable and reliable foundation',
      'Strong sense of responsibility',
      'Protective and supportive nature',
      'Practical and grounded approach',
    ],
    challenges: [
      'Can be overly rigid or resistant to change',
      'May carry too much burden',
      'Tendency toward stubbornness',
      'Risk of being taken for granted',
    ],
    guidance: [
      'Allow yourself to adapt and evolve',
      'Share responsibilities with trusted others',
      'Balance duty with personal fulfillment',
      'Practice flexibility within stability',
    ],
  },
  '己': {
    element: 'Earth',
    nature: 'Yin Earth (己) - The Fertile Soil',
    strengths: [
      'Nurturing and supportive nature',
      'Patient and accommodating',
      'Ability to help others grow',
      'Resourceful and practical',
    ],
    challenges: [
      'May give too much without receiving',
      'Can be overly self-sacrificing',
      'Tendency to absorb others\' problems',
      'Risk of feeling depleted',
    ],
    guidance: [
      'Nurture yourself as you nurture others',
      'Set clear boundaries on your giving',
      'Recognize your own needs as valid',
      'Create space for personal growth',
    ],
  },
  '庚': {
    element: 'Metal',
    nature: 'Yang Metal (庚) - The Sword',
    strengths: [
      'Strong willpower and determination',
      'Clear decision-making ability',
      'Sense of honor and righteousness',
      'Ability to cut through complexity',
    ],
    challenges: [
      'Can be too rigid or uncompromising',
      'May be overly critical',
      'Tendency toward harshness',
      'Risk of alienating others',
    ],
    guidance: [
      'Temper strength with compassion',
      'Practice flexibility in judgment',
      'Balance decisiveness with listening',
      'Cultivate gentleness alongside power',
    ],
  },
  '辛': {
    element: 'Metal',
    nature: 'Yin Metal (辛) - The Jewel',
    strengths: [
      'Refined and elegant approach',
      'Strong sense of aesthetics',
      'Precise and detail-oriented',
      'Ability to bring out beauty',
    ],
    challenges: [
      'Can be overly sensitive',
      'May struggle with rough environments',
      'Tendency toward vanity',
      'Risk of being too precious',
    ],
    guidance: [
      'Build resilience to handle imperfection',
      'Share your gifts without fear',
      'Balance refinement with practicality',
      'Value substance alongside beauty',
    ],
  },
  '壬': {
    element: 'Water',
    nature: 'Yang Water (壬) - The Ocean',
    strengths: [
      'Vast wisdom and knowledge',
      'Adaptable and resourceful',
      'Powerful and influential',
      'Ability to flow around obstacles',
    ],
    challenges: [
      'Can be overwhelming or flooding',
      'May lack clear direction',
      'Tendency toward excess',
      'Risk of emotional overwhelm',
    ],
    guidance: [
      'Channel your power with intention',
      'Set boundaries to contain your energy',
      'Practice focused, directed action',
      'Balance depth with clarity',
    ],
  },
  '癸': {
    element: 'Water',
    nature: 'Yin Water (癸) - The Rain',
    strengths: [
      'Gentle and persistent nature',
      'Deep intuition and insight',
      'Ability to nourish and refresh',
      'Adaptive and perceptive',
    ],
    challenges: [
      'Can be overly passive',
      'May struggle with assertiveness',
      'Tendency toward melancholy',
      'Risk of being overlooked',
    ],
    guidance: [
      'Trust in your gentle power',
      'Speak up for your needs and insights',
      'Build emotional boundaries',
      'Value your quiet strength',
    ],
  },
};

export default function InsightGuidanceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bundle, loading, error } = useBaziBundle();

  const dayMaster = bundle?.chart?.dayMaster;
  const guidance = dayMaster ? ELEMENT_GUIDANCE[dayMaster] : null;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.headerTitle}>
          How to Work With Your Energy
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
            <ThemedText style={styles.loadingText}>Loading guidance...</ThemedText>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
          </View>
        )}

        {bundle && guidance && (
          <>
            {/* Nature Section */}
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                ⚡ Your Elemental Nature
              </ThemedText>
              <View style={styles.card}>
                <ThemedText style={styles.natureText}>{guidance.nature}</ThemedText>
                <ThemedText style={styles.bodyText}>
                  Understanding your Day Master helps you work with, rather than against, your natural tendencies.
                </ThemedText>
              </View>
            </View>

            {/* Strengths Section */}
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                💪 Your Natural Strengths
              </ThemedText>
              <View style={styles.card}>
                {guidance.strengths.map((strength, index) => (
                  <View key={index} style={styles.listItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.listText}>{strength}</ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Challenges Section */}
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                🎯 Growth Areas
              </ThemedText>
              <View style={styles.card}>
                {guidance.challenges.map((challenge, index) => (
                  <View key={index} style={styles.listItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.listText}>{challenge}</ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Guidance Section */}
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                🌟 Practical Guidance
              </ThemedText>
              <View style={styles.card}>
                {guidance.guidance.map((tip, index) => (
                  <View key={index} style={styles.listItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.listText}>{tip}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {bundle && !guidance && (
          <View style={styles.section}>
            <View style={styles.card}>
              <ThemedText style={styles.bodyText}>
                Guidance for your Day Master is currently unavailable. Please check back later.
              </ThemedText>
            </View>
          </View>
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
  natureText: {
    fontSize: 17,
    fontWeight: '600',
    color: COBALT,
    lineHeight: 24,
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
