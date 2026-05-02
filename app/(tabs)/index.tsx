import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LiveMap } from '../../components/map/LiveMap';
import { SOSButton } from '../../components/ui/SOSButton';
import { StatusPill } from '../../components/ui/StatusPill';
import { useSOSFlow } from '../../hooks/useSOSFlow';
import { useAppStore } from '../../store/useAppStore';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { triggerSOS } = useSOSFlow();
  const { guardianMode, isSOSActive } = useAppStore();

  const handleSOSPress = () => {
    // Normal press could just show a confirmation or do nothing, 
    // but the prompt says "One-tap SOS" or "Long-press for instant".
    // We'll trigger it immediately to be safe, but they also asked for a long press.
    triggerSOS('manual_sos');
    router.push('/sos');
  };

  const handleSOSLongPress = () => {
    triggerSOS('manual_sos');
    router.push('/sos');
  };

  return (
    <View style={styles.container}>
      <LiveMap />

      <SafeAreaView style={styles.overlay} edges={['top']}>
        {/* HUD Top */}
        <View style={styles.hudTop}>
          <StatusPill 
            status="active" 
            text={guardianMode ? "Guardian Mode ON" : "🛡️ GUARDIA ACTIVE"} 
          />
          <View style={styles.scorePill}>
            <Text style={styles.scoreText}>100% SAFE</Text>
          </View>
        </View>

        {/* Center Button */}
        <View style={styles.centerButtonContainer}>
          <SOSButton 
            onPress={handleSOSPress}
            onLongPress={handleSOSLongPress}
            isActive={isSOSActive}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 20,
    pointerEvents: 'box-none',
  },
  hudTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    pointerEvents: 'box-none',
  },
  scorePill: {
    backgroundColor: 'rgba(26, 26, 36, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.pillRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scoreText: {
    fontFamily: FONTS.mono,
    color: '#00FF66',
    fontSize: 12,
  },
  centerButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
    pointerEvents: 'box-none',
  }
});
