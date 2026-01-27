# BaZi Caching Architecture

## Store Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BaZi Store                             │
│                   (Singleton Instance)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  State: {                                                   │
│    bundle: BaziBundle | null                               │
│    chartKey: string | null  (cached profile signature)     │
│    dateKey: string | null   (cached date signature)        │
│    loading: boolean                                         │
│    error: string | null                                    │
│  }                                                          │
│                                                             │
│  Methods:                                                   │
│  • load()       — Check cache, recalculate if needed       │
│  • refresh()    — Force recalculation                      │
│  • subscribe()  — Subscribe to state changes               │
│  • getState()   — Get current state                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
            ▲                                    ▲
            │ subscribe()                       │ notify
            │ load()                            │
            │                                   │
    ┌───────┴──────────┬──────────┬──────────────┴─────┐
    │                  │          │                    │
    ▼                  ▼          ▼                    ▼
  Hook 1            Hook 2      Hook 3              Hook N
(Dashboard)       (Insights)   (Learn)             (Future)
```

## Cache Hit/Miss Logic

```
useEffect(() => {
  baziStore.load();  // Called when hook mounts or screen remounts
})

baziStore.load():
  1. Get current profile via profileRepo.getProfile()
  2. If no profile:
     → Clear cache, return null
  
  3. Derive newChartKey from profile.baziInput
  4. Get todayKey (YYYY-MM-DD)
  
  5. Check: newChartKey === cachedChartKey?
     ✅ YES → Check date freshness
        a. todayKey === cachedDateKey?
           ✅ YES → Return cached bundle (FAST PATH)
           ❌ NO  → Update dateKey, notify listeners (refresh daily insight logic)
     
     ❌ NO  → Profile changed!
        a. Run runBaziPipeline(profile.baziInput)
        b. Cache new bundle with chartKey and dateKey
        c. Notify all subscribers
```

## Data Flow Diagram

### Tab Switch (NO recalculation)
```
Tab State Changes
  │
  └─→ Active tab component re-renders
       │
       └─→ Uses cached bundle (from component state)
            │
            └─→ No call to baziStore.load()
                 │
                 └─→ ✅ INSTANT (< 1ms)
```

### Screen Navigation (cache HIT)
```
Dashboard mounts
  │
  └─→ useBaziBundle() hook runs
       │
       ├─→ [Day 1] baziStore.load() called
       │    │
       │    └─→ No cached data, runs pipeline
       │         │
       │         └─→ Caches bundle with chartKey="XYZ" dateKey="2026-01-27"
       │              │
       │              └─→ Sets loading=false, returns bundle
       │
       └─→ [Day 1] Dashboard renders with bundle
            │
            ├─→ User navigates to Profile
            │
            ├─→ Dashboard unmounts (unsubscribe)
            │
            └─→ User returns to Dashboard
                 │
                 └─→ Dashboard remounts
                      │
                      └─→ useBaziBundle() hook runs again
                           │
                           └─→ baziStore.load() called
                                │
                                ├─→ Check chartKey: "XYZ" === "XYZ"? YES
                                │
                                ├─→ Check dateKey: "2026-01-27" === "2026-01-27"? YES
                                │
                                ├─→ Everything matches!
                                │
                                └─→ ✅ Return cached bundle (< 1ms)
                                     │
                                     └─→ Dashboard renders instantly
```

### Profile Edit (cache MISS)
```
Profile Setup Screen
  │
  └─→ User edits profile (e.g., birth date)
       │
       └─→ User saves via profileRepo.saveProfile()
            │
            └─→ Navigate to Dashboard
                 │
                 └─→ Dashboard mounts
                      │
                      └─→ useBaziBundle() hook runs
                           │
                           └─→ baziStore.load() called
                                │
                                ├─→ Get new profile from profileRepo
                                │
                                ├─→ Derive newChartKey="NEW_KEY"
                                │
                                ├─→ Check: "NEW_KEY" === "OLD_KEY"? NO
                                │
                                ├─→ CACHE MISS! Profile changed
                                │
                                ├─→ Set loading=true, notify subscribers
                                │
                                ├─→ Run runBaziPipeline(newProfile)
                                │    │
                                │    └─→ (Takes ~2-5 seconds)
                                │
                                ├─→ Get result, cache with new chartKey
                                │
                                ├─→ Set loading=false, notify subscribers
                                │
                                └─→ ✅ Dashboard shows new bundle
```

### Date Change (cache STALE)
```
[Day 1] Dashboard loads
  │
  └─→ baziStore.load()
       │
       └─→ Cache: chartKey="ABC", dateKey="2026-01-27"

[Day 2] User reopens app
  │
  └─→ baziStore.load()
       │
       ├─→ newChartKey="ABC", todayKey="2026-01-28"
       │
       ├─→ chartKey match: "ABC" === "ABC"? YES
       │
       ├─→ dateKey match: "2026-01-28" === "2026-01-27"? NO
       │
       ├─→ Date changed! Update dateKey
       │
       └─→ ✅ New daily insight for today
            (Chart data reused, daily insight refreshed)
```

## Cache Key Examples

### Example 1: Initial Setup
```
Profile: {
  name: "Alice",
  baziInput: {
    birthDate: Date(2000-01-15),
    timezone: "America/New_York",
    gender: "female",
    timeKnown: true
  }
}

chartKey = "2000-01-15T00:00:00.000Z|America/New_York|female|true"
dateKey = "2026-01-27"
```

### Example 2: Edit Birth Date
```
Profile: {
  name: "Alice",
  baziInput: {
    birthDate: Date(1999-06-20),  ← CHANGED
    timezone: "America/New_York",
    gender: "female",
    timeKnown: true
  }
}

newChartKey = "1999-06-20T00:00:00.000Z|America/New_York|female|true"
                                 ↑ DIFFERENT from old key
→ Cache MISS, recalculate
```

### Example 3: Edit Timezone
```
Profile: {
  name: "Alice",
  baziInput: {
    birthDate: Date(2000-01-15),
    timezone: "Europe/London",    ← CHANGED
    gender: "female",
    timeKnown: true
  }
}

newChartKey = "2000-01-15T00:00:00.000Z|Europe/London|female|true"
                                         ↑ DIFFERENT from old key
→ Cache MISS, recalculate
```

### Example 4: Next Day, Same Profile
```
Day 1:
  chartKey = "2000-01-15T00:00:00.000Z|America/New_York|female|true"
  dateKey = "2026-01-27"

Day 2:
  newChartKey = "2000-01-15T00:00:00.000Z|America/New_York|female|true" (same)
  todayKey = "2026-01-28"
  
  Chart matches, date differs
  → Reuse chart, update daily insight
```

## Memory Usage

- **Per cached bundle:** ~5-10 KB (depending on amount of data)
- **Per listener:** 1 reference
- **Total:** Minimal (typically < 50 KB for single user)

## Cleanup

```
When Dashboard unmounts:
  └─→ useBaziBundle() hook unmounts
       │
       └─→ unsubscribe() called
            │
            └─→ Listener removed from store
                 │
                 └─→ Memory freed if no other subscribers

Cache persists across:
  ✅ Tab switches (same screen)
  ✅ Navigation away/back (same app instance)
  ❌ App close/restart (cache is in-memory only)

To persist across restarts:
  → Store cache in AsyncStorage
  → Load from AsyncStorage on app start
```
