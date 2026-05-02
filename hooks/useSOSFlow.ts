import { useState } from 'react';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { useAppStore } from '../store/useAppStore';
import { db } from '../services/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export function useSOSFlow() {
  const { setSOSActive, uid, name } = useAppStore();
  const [isSending, setIsSending] = useState(false);

  const triggerSOS = async (type: 'manual_sos' | 'auto_crash', gForce?: number) => {
    setIsSending(true);
    setSOSActive(true);

    try {
      // 1. Get current GPS
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = loc.coords;
      const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
      const message = `🚨 GUARDIA ALERT: ${name || 'A user'} may need help!\nLocation: ${mapsLink}\nTime: ${new Date().toLocaleTimeString()}`;

      // 2. Send SMS (opens SMS compose sheet on device)
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(['+911234567890'], message);
      }

      // 3. Log to Firestore only if Firebase is configured
      if (uid && db) {
        await addDoc(collection(db, 'users', uid, 'incidents'), {
          type,
          timestamp: serverTimestamp(),
          lat: latitude,
          lng: longitude,
          locationName: 'Unknown Location',
          gForce: gForce ?? null,
          resolved: false,
        });
      }
    } catch (e) {
      console.error('SOS Error:', e);
    } finally {
      setIsSending(false);
    }
  };

  const cancelSOS = async () => {
    setSOSActive(false);
  };

  return { triggerSOS, cancelSOS, isSending };
}
