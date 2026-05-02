import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { User, Droplet, Shield, Bell, LogOut, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';

export default function ProfileScreen() {
  const guardianMode = useAppStore(state => state.guardianMode);
  const setUserData = useAppStore(state => state.setUserData);

  const toggleGuardianMode = () => {
    setUserData({ guardianMode: !guardianMode });
  };


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>PROFILE & SETTINGS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarLarge}>
            <User color={COLORS.background} size={40} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Harshit Kauntia</Text>
            <Text style={styles.userPhone}>+91 98765 43210</Text>
          </View>
          <View style={styles.bloodBadge}>
            <Droplet size={14} color="#FF2D4B" />
            <Text style={styles.bloodText}>O+</Text>
          </View>
        </View>

        {/* Safety Settings */}
        <Text style={styles.sectionTitle}>SAFETY</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={20} color={COLORS.active} />
              <View>
                <Text style={styles.settingText}>Guardian Mode</Text>
                <Text style={styles.settingSubtext}>Share live location with family</Text>
              </View>
            </View>
            <Switch 
              value={guardianMode} 
              onValueChange={toggleGuardianMode}
              trackColor={{ false: COLORS.surfaceLight, true: COLORS.activeGlow }}
              thumbColor={guardianMode ? COLORS.active : COLORS.textMuted}
            />
          </View>
          <View style={[styles.settingItem, styles.settingItemNoBorder]}>
            <View style={styles.settingLeft}>
              <ActivityIcon />
              <View>
                <Text style={styles.settingText}>Crash Sensitivity</Text>
                <Text style={styles.settingSubtext}>Current: 2.5G (Medium)</Text>
              </View>
            </View>
            <ChevronRight size={20} color={COLORS.textMuted} />
          </View>
        </View>

        {/* App Settings */}
        <Text style={styles.sectionTitle}>APP SETTINGS</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color={COLORS.text} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <ChevronRight size={20} color={COLORS.textMuted} />
          </View>
          <View style={[styles.settingItem, styles.settingItemNoBorder]}>
            <View style={styles.settingLeft}>
              <LogOut size={20} color={COLORS.primary} />
              <Text style={[styles.settingText, { color: COLORS.primary }]}>Logout</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const ActivityIcon = () => (
  <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: COLORS.warning, fontFamily: FONTS.mono, fontSize: 14 }}>G</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 32,
    color: COLORS.text,
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 24,
  },
  userCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: FONTS.bodyBold,
    fontSize: 20,
    color: COLORS.text,
  },
  userPhone: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  bloodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 45, 75, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.pillRadius,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 4,
  },
  bloodText: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: -8,
  },
  settingsGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingItemNoBorder: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 16,
    color: COLORS.text,
  },
  settingSubtext: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  }
});
