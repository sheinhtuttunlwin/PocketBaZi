import { Tabs } from 'expo-router';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: Colors[colorScheme ?? 'light'].border,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          height: 64,
          paddingTop: 6,
        },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
            tabBarIcon: ({ color }) => <FontAwesome5 name="yin-yang" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => <FontAwesome5 name="book" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={28} color={color} />,
        }}
      />
      {/* index tab intentionally omitted from footer */}
    </Tabs>
  );
}
