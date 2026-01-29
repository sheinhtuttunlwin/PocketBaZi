# Profile System Usage Guide

## For Developers Using the Profile System

### Import the singleton instance
```typescript
import { profileRepo } from '@/src/features/profile/profile-repo-instance';
import type { Profile } from '@/src/features/profile/types';
```

### Load a profile
```typescript
const profile = await profileRepo.getProfile();
if (profile) {
  console.log(profile.name); // guaranteed non-empty
  console.log(profile.baziInput.birthDate); // Date object
}
```

### Save a profile
```typescript
const profile: Profile = {
  name: 'John Doe', // required, validated before passing
  baziInput: {
    birthDate: new Date('1990-01-15'),
    timezone: 'America/New_York',
    gender: 'male',
    timeKnown: true,
  },
};

await profileRepo.saveProfile(profile);
```

### Clear a profile
```typescript
await profileRepo.clearProfile();
```

## Key Design Points

- **Mandatory name:** `name: string` is never optional—enforced by TypeScript
- **No AsyncStorage imports in screens:** Screens only use `profileRepo` interface
- **Profile is source of truth:** Once saved, it persists across app restarts
- **Date handling:** Automatically converts Date ↔ ISO string; you work with Date objects
- **Future-proof:** `ProfileRepo` interface allows swapping implementations (LocalProfileRepo ↔ SupabaseProfileRepo)

## Screen Behavior

The Profile screen (`app/(tabs)/profile.tsx`):
- Loads profile on mount via `useEffect`
- Shows form with all editable fields
- Validates name (required, no whitespace)
- Saves via `profileRepo.saveProfile()`
- Clears via `profileRepo.clearProfile()` with confirmation
- Shows loading/saving states
- Displays inline errors for validation

## Testing the System

1. Open the Profile screen
2. Enter a name and other details
3. Tap "Save Profile"
4. Restart the app (or navigate away and back)
5. Profile screen should show saved data
6. Try saving with empty name—should show error and block save
