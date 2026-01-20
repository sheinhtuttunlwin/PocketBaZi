// app/demo.tsx
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { runBaziPipeline } from '@/src/features/bazi/pipeline';
import type { BaziInput } from '@/src/features/bazi/types';

const DEMO_INPUT: BaziInput = {
  birthDate: new Date('1997-08-16T10:30:00'),
  timezone: 'Asia/Shanghai',
  gender: 'male',
  timeKnown: true,
};

export default function DemoScreen() {
  useEffect(() => {
    runBaziPipeline(DEMO_INPUT)
      .then((bundle) => {
        console.log('✅ BaZi bundle:', bundle);
        console.log('✅ Chart:', bundle.chart);
        console.log('✅ Interpretation:', bundle.interpretation);
        console.log('✅ Daily insight:', bundle.dailyInsight);
      })
      .catch((err) => {
        console.error('❌ Pipeline failed:', err);
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
        BaZi demo screen
      </Text>
      <Text style={{ textAlign: 'center' }}>
        Check the console for:
        {'\n'}• chart
        {'\n'}• interpretation
        {'\n'}• daily insight
      </Text>
    </View>
  );
}
