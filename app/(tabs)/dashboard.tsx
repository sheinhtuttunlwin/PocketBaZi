import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
  const router = useRouter();

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

        {/* Content */}
        {tab === 'daily' && (
          <View style={styles.contentCard}>
            <ThemedText style={styles.placeholder}>Your daily insights will appear here.</ThemedText>
          </View>
        )}
        {tab === 'chart' && (
          <View style={styles.contentCard}>
            <ThemedText style={styles.placeholder}>Your chart overview will appear here.</ThemedText>
          </View>
        )}
        {tab === 'journal' && (
          <View style={styles.contentCard}>
            <ThemedText style={styles.placeholder}>Your journal entries will appear here.</ThemedText>
          </View>
        )}
      </View>
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
    height: 480,
    width: '100%',
  },
});
