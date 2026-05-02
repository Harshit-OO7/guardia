import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'danger' | 'active';
}

export function GlassCard({ children, variant = 'default', style, ...props }: GlassCardProps) {
  let glowStyle = {};
  if (variant === 'danger') glowStyle = SHADOWS.glowDanger;
  if (variant === 'active') glowStyle = SHADOWS.glowActive;

  return (
    <View style={[styles.container, glowStyle, style]} {...props}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.surface,
    ...SHADOWS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inner: {
    padding: SIZES.padding,
    borderRadius: SIZES.cardRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.02)', // subtle reflection
  },
});
