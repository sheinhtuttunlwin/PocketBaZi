import { ThemedText } from '@/components/themed-text';
import { profileRepo } from '@/src/features/profile/profile-repo-instance';
import type { Profile } from '@/src/features/profile/types';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';
const ERROR_RED = '#dc2626';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Reload profile whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = useCallback(async () => {
    try {
      const p = await profileRepo.getProfile();
      setProfile(p);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback(() => {
    router.push('/profile-setup');
  }, [router]);

  const handleReset = useCallback(() => {
    Alert.alert('Reset Profile', 'Clear your profile and start setup?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Reset',
        onPress: async () => {
          try {
            await profileRepo.clearProfile();
            setProfile(null);
            router.replace('/profile-setup');
          } catch (error) {
            console.error('Failed to reset profile:', error);
            Alert.alert('Error', 'Failed to reset profile.');
          }
        },
        style: 'destructive',
      },
    ]);
  }, [router]);

  if (loading) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
        <View style={styles.hero}>
          <ThemedText type="title" style={styles.welcome}>Profile</ThemedText>
          <ThemedText style={styles.subtitle}>Account Settings</ThemedText>
        </View>
        <View style={[styles.sheet, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={COBALT} />
        </View>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
        <View style={styles.hero}>
          <ThemedText type="title" style={styles.welcome}>Profile</ThemedText>
          <ThemedText style={styles.subtitle}>Account Settings</ThemedText>
        </View>
        <View style={styles.sheet}>
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateTitle}>No Profile Yet</ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Create your profile to get started with your BaZi analysis.
            </ThemedText>
            <TouchableOpacity onPress={handleEdit} style={styles.primaryButton}>
              <ThemedText style={styles.primaryButtonText}>Create Profile</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const genderLabel = profile.baziInput.gender.charAt(0).toUpperCase() + profile.baziInput.gender.slice(1);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <View style={styles.hero}>
        <ThemedText type="title" style={styles.welcome}>Profile</ThemedText>
        <ThemedText style={styles.subtitle}>Account Settings</ThemedText>
      </View>

      <View style={styles.sheet}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator>
          {/* Profile Display */}
          <View style={styles.displayCard}>
            <ThemedText type="subtitle" style={styles.cardTitle}>{profile.name}</ThemedText>

            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Birth Date</ThemedText>
              <ThemedText style={styles.infoValue}>
                {profile.baziInput.birthDate.toLocaleDateString()}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Timezone</ThemedText>
              <ThemedText style={styles.infoValue}>{profile.baziInput.timezone}</ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Gender</ThemedText>
              <ThemedText style={styles.infoValue}>{genderLabel}</ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Birth Time Known</ThemedText>
              <ThemedText style={styles.infoValue}>
                {profile.baziInput.timeKnown ? 'Yes' : 'No'}
              </ThemedText>
            </View>

            {profile.baziInput.timeKnown && profile.baziInput.birthTime && (
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Birth Time</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {new Date(profile.baziInput.birthTime).toLocaleTimeString(undefined, { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: true 
                  })}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={handleEdit} style={styles.primaryButton}>
              <ThemedText style={styles.primaryButtonText}>Edit Profile</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleReset} style={styles.secondaryButton}>
              <ThemedText style={styles.secondaryButtonText}>Reset Profile</ThemedText>
            </TouchableOpacity>
          </View>
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
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  scrollContent: {
    paddingVertical: 12,
    gap: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  displayCard: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f9fafb',
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1e3a8a',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonGroup: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COBALT,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
