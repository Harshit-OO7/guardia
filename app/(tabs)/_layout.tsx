import { Tabs } from 'expo-router';
import { Home, Users, Clock, User } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { useCrashDetection } from '../../hooks/useCrashDetection';
import { CountdownAlert } from '../../components/crash/CountdownAlert';
import { useSOSFlow } from '../../hooks/useSOSFlow';
import { View } from 'react-native';

export default function TabLayout() {
  const { crashDetected, gForceReading, resetCrash } = useCrashDetection();
  const { triggerSOS } = useSOSFlow();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            elevation: 0,
          },
          tabBarActiveTintColor: COLORS.active,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarLabelStyle: {
            fontFamily: FONTS.bodyMedium,
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Map',
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contacts',
            tabBarIcon: ({ color }) => <Users size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => <Clock size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
        {/* Hide explore — leftover from default template */}
        <Tabs.Screen
          name="explore"
          options={{ href: null }}
        />
      </Tabs>

      {/* Global crash overlay — sits above all tabs */}
      {crashDetected && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <CountdownAlert
            seconds={15}
            onCancel={resetCrash}
            onTimeout={() => {
              resetCrash();
              triggerSOS('auto_crash', gForceReading);
            }}
          />
        </View>
      )}
    </>
  );
}
