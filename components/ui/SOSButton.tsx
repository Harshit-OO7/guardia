import React, { useEffect } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface SOSButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  isActive?: boolean;
}

export function SOSButton({ onPress, onLongPress, isActive = false }: SOSButtonProps) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowOpacity.value * 0.2 + 1.1 }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedButtonStyle]}>
      <Animated.View style={[styles.glowRing, animatedGlowStyle, isActive && styles.glowRingActive]} />
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        onLongPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          onLongPress();
        }}
        style={[styles.button, isActive && styles.buttonActive]}
      >
        <Text style={styles.text}>{isActive ? 'ACTIVE' : 'SOS'}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.dangerGlow,
  },
  glowRingActive: {
    backgroundColor: COLORS.activeGlow,
  },
  button: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FF5E75',
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  buttonActive: {
    backgroundColor: COLORS.active,
    borderColor: '#4DD2FF',
    shadowColor: COLORS.active,
  },
  text: {
    fontFamily: FONTS.display,
    fontSize: 48,
    color: COLORS.text,
    letterSpacing: 2,
  },
});
