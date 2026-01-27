# Local Profile System Implementation

## Overview
Implemented a clean, local Profile system using AsyncStorage with TypeScript type safety. The system is designed to be future-proofed for Supabase integration while maintaining a single source of truth for user identity in the app.

## Files Created

### 1. `/src/features/profile/types.ts`
Defines the Profile type where `name` is **mandatory** (never optional):
- `name: string` (required)
- `baziInput: BaziInput` (existing birth details type)

### 2. `/src/features/profile/profile-repo.ts`
Interface definition for ProfileRepo with three core methods:
- `getProfile(): Promise<Profile | null>` - Load saved profile
- `saveProfile(profile: Profile): Promise<void>` - Persist profile
- `clearProfile(): Promise<void>` - Delete profile

### 3. `/src/features/profile/local-profile-repo.ts`
AsyncStorage-based implementation of ProfileRepo:
- Stores profile under single key `@pocketbazi/profile` as JSON
- Automatically converts Date ↔ ISO string on save/load
- Includes error handling and console logging
- Screens never import AsyncStorage directly

### 4. `/src/features/profile/profile-repo-instance.ts`
Singleton instance exported for app-wide use:
- `export const profileRepo = new LocalProfileRepo()`
- Single instance prevents duplicate implementations

### 5. `app/(tabs)/profile.tsx` (Updated)
Complete profile screen implementation with:

**Features:**
- Loads saved profile on mount and prefills all fields
- Form fields:
  - Name (required, with validation)
  - Birth Date (date picker)
  - Timezone (text input, defaults to device timezone)
  - Gender (radio buttons: male/female/other)
  - Time Known (toggle: yes/no)
- Inline error display if name is empty
- Save button with validation (blocks save if name is whitespace)
- Clear Profile action with confirmation dialog
- Loading state on mount
- Saving state while persisting
- Proper accessibility and disabled states

**UI/UX:**
- Maintains existing design language (COBALT hero section, white sheet)
- Form validation with error states
- Loading indicators for async operations
- Alert dialogs for user feedback
- Responsive layout with ScrollView

## Dependencies Added
- `@react-native-async-storage/async-storage` - Local persistence

## Design Decisions

1. **Name is Mandatory:** TypeScript enforces this at the type level—`name: string` (never optional)
2. **Device Timezone Default:** Uses `Intl.DateTimeFormat().resolvedOptions().timeZone` for cross-platform timezone detection
3. **Date Serialization:** ISO string format ensures safe JSON storage and cross-platform compatibility
4. **Single Storage Key:** All profile data stored under `@pocketbazi/profile` for atomic operations
5. **Repository Pattern:** Cleanly separates persistence logic from UI, enabling future backend integration

## Success Criteria Met

✅ User can enter name + birth details and save  
✅ App reloads → Profile screen shows saved data  
✅ Saving is blocked if name is empty (validation)  
✅ TypeScript passes with no optional name  
✅ No authentication, signup, login, or routing changes  
✅ Dashboard and BaZi pipeline unchanged  

## Future Integration Path

When Supabase is added:
1. Create `SupabaseProfileRepo` implementing the same `ProfileRepo` interface
2. Update `profile-repo-instance.ts` to export Supabase version
3. Screen code remains unchanged—it only knows about the interface

This design ensures minimal friction when migrating to backend persistence.
