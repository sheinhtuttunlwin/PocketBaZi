import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Gender as BaziGender, BaziChart as NormalizedChart } from '@/src/features/bazi/types';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type LegacyPillar = { heavenlyStem?: string; earthlyBranch?: string } | undefined;
type LegacyChartShape = {
  yearPillar?: LegacyPillar;
  monthPillar?: LegacyPillar;
  dayPillar?: LegacyPillar;
  hourPillar?: LegacyPillar;
  dayMaster?: string;
};

interface BaziChartProps {
  chartData: NormalizedChart | LegacyChartShape;
  birthDate: Date;
  gender: BaziGender;
  sizeVariant?: 'compact' | 'large';
}

export function BaziChart({ chartData, birthDate, gender, sizeVariant = 'compact' }: BaziChartProps) {
  const { width: screenWidth } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;

  const GRID = sizeVariant === 'large'
    ? {
        PAD: 12,
        GAP_X: 8,
        GAP_Y: 6,
        LABEL_W: 40,
        CELL_MIN: 56,
        CELL_MAX: 70,
        SECTION_GAP: 12,
        HEADER_GAP: 8,
      }
    : {
        PAD: 10,
        GAP_X: 6,
        GAP_Y: 4,
        LABEL_W: 40,
        CELL_MIN: 48,
        CELL_MAX: 60,
        SECTION_GAP: 10,
        HEADER_GAP: 6,
      };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Extract pillar information safely for either normalized or legacy chart shapes
  const getDisplay = (val: any) => {
    if (val == null) return 'N/A';
    if (typeof val === 'string' || typeof val === 'number') return String(val);
    if (typeof val === 'object') {
      if ('character' in val && val.character) return String(val.character);
      if ('name' in val && val.name) return String(val.name);
      if ('chinese' in val && val.chinese) return String(val.chinese);
    }
    return 'N/A';
  };

  const getPillarInfo = (pillarKey: 'year' | 'month' | 'day' | 'hour') => {
    if ('mainPillars' in chartData && Array.isArray(chartData.mainPillars)) {
      const pillar = chartData.mainPillars.find(p => p.pillar === pillarKey);
      return {
        heavenly: getDisplay(pillar?.stem),
        earthly: getDisplay(pillar?.branch),
      };
    }

    const legacyPillar = (chartData as LegacyChartShape)?.[`${pillarKey}Pillar` as const];
    return {
      heavenly: getDisplay(legacyPillar?.heavenlyStem),
      earthly: getDisplay(legacyPillar?.earthlyBranch),
    };
  };

  const yearPillar = getPillarInfo('year');
  const monthPillar = getPillarInfo('month');
  const dayPillar = getPillarInfo('day');
  const hourPillar = getPillarInfo('hour');
  
  // Only show hour pillar if it has valid data
  const hasHourData = hourPillar.heavenly && hourPillar.earthly;

  const dayMasterValue = (chartData as any)?.dayMaster;

  const columnLabels = hasHourData ? ['Hour', 'Day', 'Month', 'Year'] : ['Day', 'Month', 'Year'];
  const stemValues = hasHourData
    ? [hourPillar.heavenly, dayPillar.heavenly, monthPillar.heavenly, yearPillar.heavenly]
    : [dayPillar.heavenly, monthPillar.heavenly, yearPillar.heavenly];
  const branchValues = hasHourData
    ? [hourPillar.earthly, dayPillar.earthly, monthPillar.earthly, yearPillar.earthly]
    : [dayPillar.earthly, monthPillar.earthly, yearPillar.earthly];

  const columnCount = columnLabels.length;
  const gridTotalGaps = GRID.GAP_X * (columnCount - 1);
  const availableWidth = screenWidth - GRID.PAD * 2 - gridTotalGaps;
  const rawCellSize = availableWidth / columnCount;
  const cellSize = Math.floor(Math.min(GRID.CELL_MAX, Math.max(GRID.CELL_MIN, rawCellSize)));

  // Create dynamic styles based on GRID
  const dynamicStyles = {
    containerPadding: GRID.PAD,
    sectionMargin: GRID.SECTION_GAP,
    headerGap: GRID.HEADER_GAP,
  };

  return (
    <ThemedView style={[styles.container, { padding: dynamicStyles.containerPadding }]}>
      <ThemedText style={styles.title}>Four Pillars Chart</ThemedText>
      
      {/* Birth Information Card */}
      <ThemedView style={[styles.birthInfoCard, { marginBottom: dynamicStyles.sectionMargin }]}>
        <ThemedView style={styles.birthInfoRow}>
          <ThemedView style={styles.birthInfoItem}>
            <ThemedText style={styles.birthInfoLabel}>Date</ThemedText>
            <ThemedText style={styles.birthInfoValue}>{formatDate(birthDate)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.birthDivider} />
          <ThemedView style={styles.birthInfoItem}>
            <ThemedText style={styles.birthInfoLabel}>Time</ThemedText>
            <ThemedText style={styles.birthInfoValue}>{formatTime(birthDate)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.birthDivider} />
          <ThemedView style={styles.birthInfoItem}>
            <ThemedText style={styles.birthInfoLabel}>Gender</ThemedText>
            <ThemedText style={styles.birthInfoValue}>
              {gender === 'male' ? '♂ Male' : gender === 'female' ? '♀ Female' : gender.charAt(0).toUpperCase() + gender.slice(1)}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Four Pillars Grid */}
      <ThemedView style={[styles.pillarsCard, { marginBottom: dynamicStyles.sectionMargin }]}>
        {/* Row 1: Column Headers */}
        <ThemedView style={styles.gridRow}>
          {columnLabels.map((label, index) => (
            <ThemedText
              key={label}
              style={[
                styles.columnHeaderText,
                {
                  width: cellSize,
                  marginRight: index !== columnLabels.length - 1 ? GRID.GAP_X : 0,
                },
              ]}
            >
              {label}
            </ThemedText>
          ))}
        </ThemedView>
        
        {/* Row 2: Heavenly Stems */}
        <ThemedView style={[styles.gridRow, { marginBottom: GRID.GAP_Y }]}>
          {stemValues.map((value, index) => (
            <ThemedView
              key={`stem-${index}`}
              style={[
                styles.pillarCell,
                styles.stemCell,
                {
                  width: cellSize,
                  height: cellSize,
                  marginRight: index !== stemValues.length - 1 ? GRID.GAP_X : 0,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.pillarText,
                  {
                    fontSize: Math.round(cellSize * 0.5),
                    lineHeight: Math.round(cellSize * 0.5) + 4,
                  },
                ]}
              >
                {value}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
        
        {/* Row 3: Earthly Branches */}
        <ThemedView style={styles.gridRow}>
          {branchValues.map((value, index) => (
            <ThemedView
              key={`branch-${index}`}
              style={[
                styles.pillarCell,
                styles.branchCell,
                {
                  width: cellSize,
                  height: cellSize,
                  marginRight: index !== branchValues.length - 1 ? GRID.GAP_X : 0,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.pillarText,
                  {
                    fontSize: Math.round(cellSize * 0.5),
                    lineHeight: Math.round(cellSize * 0.5) + 4,
                  },
                ]}
              >
                {value}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Legend */}
      <ThemedView style={[styles.legendContainer, { marginBottom: dynamicStyles.sectionMargin }]}>
        <ThemedView style={styles.legendItem}>
          <ThemedView style={[styles.legendColor, styles.stemCell]} />
          <ThemedText style={styles.legendLabel}>Heavenly Stems</ThemedText>
        </ThemedView>
        <ThemedView style={styles.legendItem}>
          <ThemedView style={[styles.legendColor, styles.branchCell]} />
          <ThemedText style={styles.legendLabel}>Earthly Branches</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Day Master */}
      {dayMasterValue && (
        <ThemedView style={styles.dayMasterCard}>
          <ThemedView style={styles.dayMasterTextBlock}>
            <ThemedText style={styles.dayMasterLabel}>Day Master</ThemedText>
            <ThemedText style={styles.dayMasterSubLabel}>(Self Element)</ThemedText>
          </ThemedView>
          <ThemedText style={styles.dayMasterValue}>{dayMasterValue}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  birthInfoCard: {
    borderRadius: 14,
    paddingHorizontal: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  birthInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  birthInfoItem: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
  },
  birthInfoLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  birthInfoValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  birthDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 6,
  },
  pillarsCard: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.02)',
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  columnHeaderText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  pillarCell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  stemCell: {
    backgroundColor: '#FFD699',
    borderWidth: 2,
    borderColor: '#FFB74D',
  },
  branchCell: {
    backgroundColor: '#B8D4FF',
    borderWidth: 2,
    borderColor: '#6BA3E5',
  },
  pillarText: {
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#888',
  },
  dayMasterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.02)',
    gap: 8,
  },
  dayMasterTextBlock: {
    backgroundColor: 'transparent',
  },
  dayMasterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  dayMasterSubLabel: {
    fontSize: 9,
    fontWeight: '400',
    color: '#BBB',
    marginTop: 1,
  },
  dayMasterValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFB74D',
  },
});
