import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';

type StoredEntry = {
  dateKey: string;
  text: string;
  updatedAt: string;
};

export default function JournalHistoryScreen() {
  const insets = useSafeAreaInsets();
  const [entries, setEntries] = useState<StoredEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllEntries();
  }, []);

  const loadAllEntries = async () => {
    try {
      setLoading(true);
      const allKeys = await AsyncStorage.getAllKeys();
      const journalKeys = allKeys.filter((key) => key.startsWith('pocketbazi:journal:v1:'));

      if (journalKeys.length === 0) {
        setEntries([]);
        return;
      }

      const keyValuePairs = await AsyncStorage.multiGet(journalKeys);
      const parsedEntries: StoredEntry[] = [];

      keyValuePairs.forEach(([key, value]) => {
        if (value) {
          try {
            const data = JSON.parse(value);
            const dateKey = key.replace('pocketbazi:journal:v1:', '');
            parsedEntries.push({
              dateKey,
              text: data.text,
              updatedAt: data.updatedAt,
            });
          } catch (err) {
            console.error('Failed to parse entry:', key, err);
          }
        }
      });

      // Sort by date descending (most recent first)
      parsedEntries.sort((a, b) => b.dateKey.localeCompare(a.dateKey));
      setEntries(parsedEntries);
    } catch (error) {
      console.error('Error loading journal entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <View style={styles.hero}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>
          Journal History
        </ThemedText>
        <ThemedText style={styles.subtitle}>View your past journal entries</ThemedText>
      </View>

      <View style={styles.sheet}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
        >
          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={COBALT} />
              <ThemedText style={styles.loadingText}>Loading entries...</ThemedText>
            </View>
          ) : entries.length === 0 ? (
            <View style={styles.centered}>
              <ThemedText style={styles.emptyText}>No journal entries yet</ThemedText>
              <ThemedText style={styles.emptySubtext}>Start writing to build your journal history</ThemedText>
            </View>
          ) : (
            entries.map((entry) => (
              <View key={entry.dateKey} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.dateText}>
                    {entry.dateKey}
                  </ThemedText>
                  <ThemedText style={styles.timestampText}>
                    Updated: {new Date(entry.updatedAt).toLocaleString()}
                  </ThemedText>
                </View>
                <View style={styles.divider} />
                <ThemedText style={styles.entryText}>
                  {entry.text || '(Empty entry)'}
                </ThemedText>
              </View>
            ))
          )}
        </ScrollView>
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
    paddingBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 4,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    color: '#93b5ff',
    fontSize: 15,
  },
  sheet: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 0,
    paddingHorizontal: 0,
    overflow: 'hidden',
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
    padding: 24,
    gap: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  entryCard: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  entryHeader: {
    gap: 4,
  },
  dateText: {
    fontSize: 18,
    color: COBALT,
  },
  timestampText: {
    fontSize: 12,
    color: '#6b7280',
  },
  divider: {
    height: 1,
    backgroundColor: LINE_LIGHT,
    marginVertical: 12,
    opacity: 0.5,
  },
  entryText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});
