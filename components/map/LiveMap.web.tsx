import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

// Web stub — react-native-maps is a native-only module
// On web we render a styled dark placeholder
export function LiveMap() {
  return (
    <View style={styles.container}>
      <View style={styles.grid} />
      <View style={styles.message}>
        <Text style={styles.title}>LIVE MAP</Text>
        <Text style={styles.subtitle}>Available on Android & iOS only</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A0F1A',
    overflow: 'hidden',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderWidth: 0,
    // Simulated dark map effect via background
    backgroundImage: 'linear-gradient(rgba(0,194,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.03) 1px, transparent 1px)',
  } as any,
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 24,
    color: COLORS.active,
    letterSpacing: 4,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 8,
  },
});
