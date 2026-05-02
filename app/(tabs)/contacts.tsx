import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { Plus, User, PhoneCall, MessageSquare } from 'lucide-react-native';

const MOCK_CONTACTS = [
  { id: '1', name: 'Mom', relation: 'Family', phone: '+1234567890', mode: 'both' },
  { id: '2', name: 'Dr. Smith', relation: 'Doctor', phone: '+1987654321', mode: 'call' },
];

export default function ContactsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>TRUSTED CONTACTS</Text>
        <Text style={styles.subtitle}>These people will be notified during an emergency.</Text>
      </View>

      <FlatList
        data={MOCK_CONTACTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <User color={COLORS.text} size={20} />
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.relationChip}>
                  <Text style={styles.relationText}>{item.relation}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <View style={[styles.modeIndicator, item.mode === 'both' || item.mode === 'call' ? styles.modeActive : {}]}>
                <PhoneCall size={14} color={COLORS.text} />
              </View>
              <View style={[styles.modeIndicator, item.mode === 'both' || item.mode === 'sms' ? styles.modeActive : {}]}>
                <MessageSquare size={14} color={COLORS.text} />
              </View>
            </View>
          </View>
        )}
      />

      <Pressable style={styles.fab}>
        <Plus size={24} color="#000" />
      </Pressable>
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
  listContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {},
  name: {
    fontFamily: FONTS.bodyBold,
    fontSize: 16,
    color: COLORS.text,
  },
  relationChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  relationText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  modeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },
  modeActive: {
    opacity: 1,
    backgroundColor: 'rgba(0, 194, 255, 0.2)',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  }
});
