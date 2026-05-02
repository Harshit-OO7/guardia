import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { ShieldCheck } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  const setUserData = useAppStore(state => state.setUserData);

  const handleSendOTP = () => {
    // Mock sending OTP
    if (phone.length > 5) {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = () => {
    // Mock verification
    if (otp.length === 6) {
      setUserData({
        uid: 'user_123',
        name: 'Harshit Kauntia',
        phone: phone,
      });
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <ShieldCheck size={64} color={COLORS.primary} />
          <Text style={styles.title}>GUARDIA</Text>
          <Text style={styles.subtitle}>Your silent guardian on every road.</Text>
        </View>

        <View style={styles.form}>
          {!otpSent ? (
            <>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 234 567 8900"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <Pressable style={styles.button} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>SEND OTP</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.label}>ENTER 6-DIGIT OTP</Text>
              <TextInput
                style={[styles.input, { letterSpacing: 8, textAlign: 'center' }]}
                placeholder="------"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />
              <Pressable style={styles.button} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>VERIFY & LOGIN</Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 48,
    color: COLORS.text,
    letterSpacing: 4,
    marginTop: 16,
  },
  subtitle: {
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  label: {
    fontFamily: FONTS.mono,
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.cardRadius,
    padding: 16,
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.active,
    padding: 16,
    borderRadius: SIZES.pillRadius,
    alignItems: 'center',
    shadowColor: COLORS.active,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontFamily: FONTS.bodyBold,
    color: '#000000',
    fontSize: 16,
    letterSpacing: 1,
  }
});
