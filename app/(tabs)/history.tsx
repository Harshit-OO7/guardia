import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { ShieldAlert, Activity, Share } from 'lucide-react-native';

const MOCK_HISTORY = [
  { id: '1', type: 'auto_crash', date: '2023-10-24 14:30', location: '101 Highway, Sector 4', gForce: 3.2 },
  { id: '2', type: 'manual_sos', date: '2023-09-12 22:15', location: 'Downtown 5th Ave', gForce: null },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>INCIDENT HISTORY</Text>
        <Text style={styles.subtitle}>Records of detected crashes and SOS alerts.</Text>
      </View>

      <View style={styles.statsStrip}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Total Incidents</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>142</Text>
          <Text style={styles.statLabel}>Safe Trips</Text>
        </View>
      </View>

      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.typeRow}>
                {item.type === 'auto_crash' ? 
                  <Activity size={18} color={COLORS.warning} /> : 
                  <ShieldAlert size={18} color={COLORS.primary} />
                }
                <Text style={[
                  styles.typeText, 
                  { color: item.type === 'auto_crash' ? COLORS.warning : COLORS.primary }
                ]}>
                  {item.type === 'auto_crash' ? 'AUTO-DETECTED CRASH' : 'MANUAL SOS'}
                </Text>
              </View>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            
            <View style={styles.cardBody}>
              <Text style={styles.locationLabel}>LOCATION</Text>
              <Text style={styles.locationText}>{item.location}</Text>
              
              {item.gForce && (
                <View style={styles.gForcePill}>
                  <Text style={styles.gForceText}>Max Impact: {item.gForce}G</Text>
                </View>
              )}
            </View>
            
            <View style={styles.cardFooter}>
              <View style={styles.shareBtn}>
                <Share size={14} color={COLORS.text} />
                <Text style={styles.shareText}>SHARE REPORT</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

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
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  statsStrip: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surfaceLight,
  },
  statBox: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statValue: {
    fontFamily: FONTS.mono,
    fontSize: 24,
    color: COLORS.active,
  },
  statLabel: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
  },
  dateText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  cardBody: {
    padding: 16,
  },
  locationLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  locationText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 16,
    color: COLORS.text,
  },
  gForcePill: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 184, 48, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  gForceText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.warning,
  },
  cardFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'flex-end',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.pillRadius,
    backgroundColor: COLORS.surfaceLight,
  },
  shareText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
    color: COLORS.text,
  }
});
