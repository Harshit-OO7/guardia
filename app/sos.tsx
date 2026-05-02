import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, FadeIn } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useSOSFlow } from '../hooks/useSOSFlow';
import { router } from 'expo-router';
import * as Linking from 'expo-linking';
import { Phone, Share, ShieldAlert } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function SOSActiveScreen() {
  const { cancelSOS, isSending } = useSOSFlow();
  const bgPulse = useSharedValue(0.2);

  useEffect(() => {
    bgPulse.value = withRepeat(
      withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedBgStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255, 45, 75, ${bgPulse.value})`
  }));

  const handleCancel = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    cancelSOS();
    router.back();
  };

  const handleCall112 = () => {
    Linking.openURL('tel:112');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedBgStyle]} />
      
      <SafeAreaView style={styles.content}>
        <Animated.View entering={FadeIn.delay(300)} style={styles.header}>
          <ShieldAlert size={64} color="#FFFFFF" />
          <Text style={styles.title}>HELP IS NOTIFIED</Text>
          <Text style={styles.subtitle}>
            {isSending ? "Sending alerts..." : "Emergency contacts have received your location."}
          </Text>
        </Animated.View>

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={handleCall112}>
            <Phone size={24} color={COLORS.text} />
            <Text style={styles.actionText}>CALL 112</Text>
          </Pressable>

          <Pressable style={styles.actionBtn}>
            <Share size={24} color={COLORS.text} />
            <Text style={styles.actionText}>SHARE LINK</Text>
          </Pressable>
        </View>

        <Pressable style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>I'M SAFE - CANCEL SOS</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 48,
    color: '#FFFFFF',
    marginTop: 20,
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 20,
    borderRadius: SIZES.cardRadius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionText: {
    fontFamily: FONTS.bodyBold,
    color: COLORS.text,
    marginTop: 10,
  },
  cancelBtn: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderRadius: SIZES.pillRadius,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 16,
    color: '#000000',
    letterSpacing: 1,
  }
});
