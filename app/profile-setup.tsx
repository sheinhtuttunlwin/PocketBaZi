import { ThemedText } from '@/components/themed-text';
import type { Gender } from '@/src/features/bazi/types';
import { profileRepo } from '@/src/features/profile/profile-repo-instance';
import type { Profile } from '@/src/features/profile/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';
const LINE_LIGHT = '#93b5ff';
const SUCCESS_GREEN = '#059669';
const ERROR_RED = '#dc2626';

/**
 * Get device timezone using Intl API (works on all platforms)
 */
function getDeviceTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

export default function ProfileSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const deviceTz = useMemo(() => getDeviceTimezone(), []);

  // Form state
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [timezone, setTimezone] = useState(deviceTz);
  const [gender, setGender] = useState<Gender>('male');
  const [timeKnown, setTimeKnown] = useState(false);
  const [nameError, setNameError] = useState('');

  // UI state
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load profile on mount (if editing)
  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await profileRepo.getProfile();
        if (profile) {
          setName(profile.name);
          setBirthDate(profile.baziInput.birthDate);
          setTimezone(profile.baziInput.timezone);
          setGender(profile.baziInput.gender);
          setTimeKnown(profile.baziInput.timeKnown);
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  // Validate and save
  const handleSave = useCallback(async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Name is required');
      return;
    }

    setNameError('');
    setSaving(true);

    try {
      const profile: Profile = {
        name: trimmedName,
        baziInput: {
          birthDate,
          timezone,
          gender,
          timeKnown,
        },
      };
      await profileRepo.saveProfile(profile);
      Alert.alert('Success', 'Profile saved successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/dashboard'),
        },
      ]);
    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
      setSaving(false);
    }
  }, [name, birthDate, timezone, gender, timeKnown, router]);

  // Date picker handler
  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  if (loading) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
        <View style={styles.hero}>
          <ThemedText type="title" style={styles.welcome}>
            {isEditing ? 'Edit Profile' : 'Create Profile'}
          </ThemedText>
          <ThemedText style={styles.subtitle}>Account Setup</ThemedText>
        </View>
        <View style={[styles.sheet, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={COBALT} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <View style={styles.hero}>
        <ThemedText type="title" style={styles.welcome}>
          {isEditing ? 'Edit Profile' : 'Create Profile'}
        </ThemedText>
        <ThemedText style={styles.subtitle}>Account Setup</ThemedText>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={styles.backText}>✕</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.sheet}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Name Field */}
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Name *</ThemedText>
            <TextInput
              style={[styles.input, nameError ? styles.inputError : {}]}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameError && text.trim()) setNameError('');
              }}
              editable={!saving}
            />
            {nameError ? (
              <ThemedText style={styles.errorText}>{nameError}</ThemedText>
            ) : null}
          </View>

          {/* Birth Date Field */}
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Birth Date</ThemedText>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              disabled={saving}
              style={styles.dateButton}
            >
              <ThemedText>{birthDate.toLocaleDateString()}</ThemedText>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}

          {/* Timezone Field */}
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Timezone</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="e.g. America/New_York"
              placeholderTextColor="#999"
              value={timezone}
              onChangeText={setTimezone}
              editable={!saving}
            />
          </View>

          {/* Gender Field */}
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Gender</ThemedText>
            <View style={styles.genderButtons}>
              {(['male', 'female', 'other'] as Gender[]).map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setGender(g)}
                  disabled={saving}
                  style={[styles.genderButton, gender === g && styles.genderButtonActive]}
                >
                  <ThemedText style={[styles.genderButtonText, gender === g && styles.genderButtonTextActive]}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Time Known Toggle */}
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Birth Time Known</ThemedText>
            <TouchableOpacity
              onPress={() => setTimeKnown(!timeKnown)}
              disabled={saving}
              style={[styles.toggleButton, timeKnown && styles.toggleButtonActive]}
            >
              <ThemedText style={styles.toggleText}>{timeKnown ? 'Yes' : 'No'}</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              style={[styles.primaryButton, saving && styles.buttonDisabled]}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.primaryButtonText}>
                  {isEditing ? 'Update Profile' : 'Create Profile'}
                </ThemedText>
              )}
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={saving}
              style={[styles.secondaryButton, saving && styles.buttonDisabled]}
            >
              <ThemedText style={styles.secondaryButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COBALT },
  hero: { paddingHorizontal: 24, paddingBottom: 16, position: 'relative' },
  welcome: { color: '#fff', marginBottom: 4 },
  subtitle: { color: '#93b5ff', fontSize: 15 },
  backBtn: {
    position: 'absolute',
    right: 24,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
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
    gap: 16,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  inputError: {
    borderColor: ERROR_RED,
    backgroundColor: '#fef2f2',
  },
  errorText: {
    fontSize: 13,
    color: ERROR_RED,
  },
  dateButton: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  genderButtonActive: {
    borderColor: COBALT,
    backgroundColor: COBALT,
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  genderButtonTextActive: {
    color: '#fff',
  },
  toggleButton: {
    borderWidth: 1.5,
    borderColor: LINE_LIGHT,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  toggleButtonActive: {
    borderColor: SUCCESS_GREEN,
    backgroundColor: SUCCESS_GREEN,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  buttonGroup: {
    gap: 12,
    marginTop: 16,
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
  buttonDisabled: {
    opacity: 0.6,
  },
});
