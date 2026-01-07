import { ThemedText } from '@/components/themed-text';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COBALT = '#1e3a8a';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}> 
      <View style={styles.hero}>
        <ThemedText type="title" style={styles.welcome}>Profile</ThemedText>
      </View>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}> 
        <View style={styles.contentCard}>
          <ThemedText>Your profile details will appear here.</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COBALT },
  hero: { paddingHorizontal: 24, paddingBottom: 12 },
  welcome: { color: '#fff' },
  sheet: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 14,
    paddingHorizontal: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  contentCard: {
    borderWidth: 1.5,
    borderColor: COBALT,
    borderRadius: 14,
    padding: 16,
    height: 480,
    width: '100%',
  },
});
