import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface StatusPillProps {
  status: 'active' | 'warning' | 'danger';
  text: string;
}

export function StatusPill({ status, text }: StatusPillProps) {
  const getColors = () => {
    switch (status) {
      case 'active': return { bg: 'rgba(0, 194, 255, 0.1)', border: COLORS.active, text: COLORS.active, Icon: ShieldCheck };
      case 'warning': return { bg: 'rgba(255, 184, 48, 0.1)', border: COLORS.warning, text: COLORS.warning, Icon: ShieldAlert };
      case 'danger': return { bg: 'rgba(255, 45, 75, 0.1)', border: COLORS.primary, text: COLORS.primary, Icon: Shield };
    }
  };

  const colors = getColors();
  const Icon = colors.Icon;

  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut}
      style={[
        styles.container, 
        { backgroundColor: colors.bg, borderColor: colors.border }
      ]}
    >
      <Icon size={16} color={colors.text} />
      <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.pillRadius,
    borderWidth: 1,
  },
  text: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 14,
    marginLeft: 8,
    letterSpacing: 0.5,
  }
});
