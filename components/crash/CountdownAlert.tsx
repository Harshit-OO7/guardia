import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface CountdownAlertProps {
  seconds: number;
  onCancel: () => void;
  onTimeout: () => void;
}

export function CountdownAlert({ seconds = 15, onCancel, onTimeout }: CountdownAlertProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      // Haptic pulse every second
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.overlay}>
      <Animated.View entering={SlideInDown.springify()} style={styles.card}>
        <Text style={styles.warningText}>CRASH DETECTED</Text>
        <Text style={styles.subText}>Notifying emergency contacts in</Text>
        <Text style={styles.timeText}>{timeLeft}s</Text>
        
        <Pressable 
          style={styles.cancelBtn} 
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onCancel();
          }}
        >
          <Text style={styles.cancelBtnText}>I'M SAFE - CANCEL</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 15, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  card: {
    width: '85%',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  warningText: {
    fontFamily: FONTS.display,
    fontSize: 36,
    color: COLORS.primary,
    marginBottom: 8,
  },
  subText: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 20,
  },
  timeText: {
    fontFamily: FONTS.mono,
    fontSize: 64,
    color: COLORS.text,
    marginBottom: 40,
  },
  cancelBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: SIZES.pillRadius,
    width: '100%',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontFamily: FONTS.bodyBold,
    color: '#000000',
    fontSize: 16,
    letterSpacing: 1,
  },
});
