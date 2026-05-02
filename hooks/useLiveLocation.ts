import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useAppStore } from '../store/useAppStore';
import { db } from '../services/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function useLiveLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const uid = useAppStore(state => state.uid);
  const liveLocationShared = useAppStore(state => state.liveLocationShared);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission denied');
        return;
      }

      const initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);

          // Stream to Firestore if live sharing is active and Firebase is ready
          if (liveLocationShared && uid && db) {
            setDoc(
              doc(db, 'liveLocations', uid),
              {
                lat: newLocation.coords.latitude,
                lng: newLocation.coords.longitude,
                updatedAt: serverTimestamp(),
                isActive: true,
              },
              { merge: true }
            ).catch(console.error);
          }
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [uid, liveLocationShared]);

  return { location, errorMsg };
}
