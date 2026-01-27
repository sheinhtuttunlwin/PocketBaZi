import { BaziChart } from '@/components/bazi-chart';
import { ThemedText } from '@/components/themed-text';
import { runBaziPipeline } from '@/src/features/bazi/pipeline';
import type { BaziBundle, BaziInput } from '@/src/features/bazi/types';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const ACCENT = '#1d4ed8';
const LINE_LIGHT = '#93b5ff';

type TabKey = 'daily' | 'chart' | 'journal';

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'daily', label: 'Daily Insight' },
  { key: 'chart', label: 'My Chart' },
  { key: 'journal', label: 'Journal' },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<TabKey>('daily');
  const [bundle, setBundle] = useState<BaziBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabCount = TABS.length;

  const activeIndex = useMemo(
    () => Math.max(0, TABS.findIndex(t => t.key === tab)),
    [tab]
  );

  const todayLabel = useMemo(
    () => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }),
    []
  );

  const segmentWidth = useMemo(
    () => `${100 / tabCount}%`,
    [tabCount]
  );

  const segmentLeft = useMemo(
    () => `${(100 / tabCount) * activeIndex}%`,
    [tabCount, activeIndex]
  );

  const initialInput = useMemo<BaziInput>(() => ({
    birthDate: new Date('1997-08-16T10:30:00Z'),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC',
    gender: 'male',
    timeKnown: true,
  }), []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    runBaziPipeline(initialInput)
      .then(data => {
        if (!active) return;
        setBundle(data);
        setError(null);
      })
      .catch(err => {
        console.error('BaZi pipeline failed', err);
        if (!active) return;
        setError('Unable to load BaZi data right now. Please try again in a moment.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [initialInput]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.hero}>
        <ThemedText type="title" style={styles.welcome}>
          Welcome
        </ThemedText>
        {/* FortunFree button removed */}
      </View>

      {/* White Sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map(({ key, label }) => {
            const active = tab === key;
            return (
              <TouchableOpacity
                key={key}
                accessibilityRole="button"
                onPress={() => setTab(key)}
                style={styles.tabBtn}
                activeOpacity={0.7}
              >
                <ThemedText
                  style={[
                    styles.tabLabel,
                    active && styles.tabLabelActive,
                  ]}
                >
                  {label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}

          {/* Unified underline system */}
          <View pointerEvents="none" style={styles.lineBar}>
            <View
              style={[
                styles.activeLine,
                {
                  width: segmentWidth as any,
                  left: segmentLeft as any,
                },
              ]}
            />
          </View>
        </View>

        <ThemedText style={styles.subheader}>{todayLabel}</ThemedText>

        <View style={styles.panelArea}>
          {loading && (
            <View style={[styles.contentCardFixed, styles.centered]}>
              <ActivityIndicator color={ACCENT} />
              <ThemedText style={[styles.placeholder, { marginTop: 12 }]}>Calculating your BaZi...</ThemedText>
            </View>
          )}

          {!loading && error && (
            <View style={[styles.contentCardFixed, styles.centered]}>
              <ThemedText style={styles.placeholder}>{error}</ThemedText>
            </View>
          )}

          {!loading && !error && bundle && (
            <View style={styles.stack}>
              {tab === 'daily' && <DailyInsightTab bundle={bundle} />}
              {tab === 'chart' && <ChartTab bundle={bundle} />}
              {tab === 'journal' && <JournalTab bundle={bundle} />}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

function DailyInsightTab({ bundle }: { bundle: BaziBundle }) {
  const dayMaster = bundle.chart.dayMaster ?? '—';

  return (
    <View style={styles.contentCardFixed}>
      <ScrollView
        style={styles.cardScroll}
        contentContainerStyle={styles.cardScrollContent}
        showsVerticalScrollIndicator
        nestedScrollEnabled
      >
        <ThemedText type="subtitle" style={styles.cardTitle}>Today&apos;s Insight</ThemedText>
        <ThemedText style={styles.meta}>Day Master: {dayMaster}</ThemedText>
        <ThemedText style={styles.meta}>Timezone: {bundle.input.timezone}</ThemedText>

        <View style={styles.divider} />

        <ThemedText style={styles.bodyText}>
          {bundle.dailyInsight || 'No daily insight was generated for today.'}
        </ThemedText>
      </ScrollView>
    </View>
  );
}

function ChartTab({ bundle }: { bundle: BaziBundle }) {
  return (
    <View style={styles.contentCardFixed}>
      <ScrollView
        style={styles.cardScroll}
        contentContainerStyle={styles.cardScrollContent}
        showsVerticalScrollIndicator
        nestedScrollEnabled
      >
        <BaziChart
          chartData={bundle.chart}
          birthDate={bundle.input.birthDate}
          gender={bundle.input.gender}
        />
      </ScrollView>
    </View>
  );
}

function JournalTab({ bundle }: { bundle: BaziBundle }) {
  const dayMaster = bundle.chart.dayMaster ?? 'your Day Master';
  const insightSnippet = bundle.dailyInsight?.slice(0, 140) ?? "today's energy";

  const prompts = [
    `How can your ${dayMaster} quality guide one decision today?`,
    `What aligns with ${dayMaster} this week and what feels off-balance?`,
    `Given ${insightSnippet}, what is one action you can take in the next 24 hours?`,
  ];

  return (
    <View style={styles.contentCardFixed}>
      <ScrollView
        style={styles.cardScroll}
        contentContainerStyle={styles.cardScrollContent}
        showsVerticalScrollIndicator
        nestedScrollEnabled
      >
        <ThemedText type="subtitle" style={styles.cardTitle}>Journal</ThemedText>
        <ThemedText style={styles.meta}>Use these prompts to reflect.</ThemedText>
        <View style={styles.divider} />
        {prompts.map((prompt, idx) => (
          <View key={idx} style={styles.promptRow}>
            <ThemedText style={styles.promptBullet}>•</ThemedText>
            <ThemedText style={styles.promptText}>{prompt}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COBALT,
  },

  hero: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  welcome: {
    color: '#fff',
  },

  sheet: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    // tighter spacing near top
    paddingTop: 14,
    paddingHorizontal: 24,
    gap: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },

  tabRow: {
    flexDirection: 'row',
    position: 'relative',
    marginHorizontal: -24,
    paddingHorizontal: 24,

    paddingTop: 2,
    paddingBottom: 10,
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabLabel: {
    fontWeight: '500',
    color: '#6b7280',
  },

  tabLabelActive: {
    color: ACCENT,
    fontWeight: '700',
  },
  headerBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  headerBtnText: {
    fontWeight: '700',
    color: '#fff',
  },

  // Single continuous baseline
  lineBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    height: 4,
    backgroundColor: LINE_LIGHT,
    borderRadius: 2,
    overflow: 'hidden', // ensures uniform segment length
  },

  // Continous tab bar styling
  /*lineBar: {
    position: 'absolute',
    left: -24,
    right: -24,
    bottom: 0,
    height: 4,
    backgroundColor: LINE_LIGHT,
    borderRadius: 2,
    overflow: 'hidden',
  }, */


  // Active segment (no radius; inherits from container)
  activeLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: ACCENT,
  },

  placeholder: {
    opacity: 0.7,
  },
  subheader: {
    color: LINE_LIGHT,
    fontWeight: '700',
    marginBottom: -2,
  },
  contentCard: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 14,
    padding: 16,
    width: '100%',
  },
  contentCardFixed: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 14,
    padding: 0,
    width: '100%',
    height: 520,
    overflow: 'hidden',
  },
  cardScroll: {
    flex: 1,
  },
  cardScrollContent: {
    padding: 16,
    paddingBottom: 20,
    gap: 8,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelArea: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 16,
  },
  stack: {
    gap: 16,
  },
  cardTitle: {
    marginBottom: 4,
  },
  meta: {
    color: '#6b7280',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: LINE_LIGHT,
    marginVertical: 10,
    opacity: 0.5,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  promptBullet: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 1,
  },
  promptText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
});
