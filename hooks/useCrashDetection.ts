import { useEffect, useState, useRef } from 'react';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useAppStore } from '../store/useAppStore';
import * as Haptics from 'expo-haptics';
import { CONFIG } from '../constants/config';

export function useCrashDetection() {
  const { crashSensitivity, isSOSActive } = useAppStore();
  const [crashDetected, setCrashDetected] = useState(false);
  const [gForceReading, setGForceReading] = useState(0);

  const accelSubscription = useRef<any>(null);
  const gyroSubscription = useRef<any>(null);

  const lastGyro = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (isSOSActive) {
      stopSensors();
      return;
    }

    Accelerometer.setUpdateInterval(1000 / CONFIG.crashDetection.sampleRateHz);
    Gyroscope.setUpdateInterval(1000 / CONFIG.crashDetection.sampleRateHz);

    startSensors();

    return () => {
      stopSensors();
    };
  }, [crashSensitivity, isSOSActive]);

  const startSensors = () => {
    gyroSubscription.current = Gyroscope.addListener(gyroData => {
      lastGyro.current = gyroData;
    });

    accelSubscription.current = Accelerometer.addListener(accelData => {
      const { x, y, z } = accelData;
      // Calculate resultant G-force
      const gForce = Math.sqrt(x * x + y * y + z * z);
      
      if (gForce > crashSensitivity) {
        // Cross-check with gyro to prevent false positives (e.g. dropping phone)
        // A real crash usually involves sudden rotational change too
        const gyroMag = Math.sqrt(
          lastGyro.current.x ** 2 + 
          lastGyro.current.y ** 2 + 
          lastGyro.current.z ** 2
        );

        if (gyroMag > 2.0) { // arbitrary threshold for sudden rotation
          triggerCrashSequence(gForce);
        }
      }
    });
  };

  const stopSensors = () => {
    if (accelSubscription.current) {
      accelSubscription.current.remove();
      accelSubscription.current = null;
    }
    if (gyroSubscription.current) {
      gyroSubscription.current.remove();
      gyroSubscription.current = null;
    }
  };

  const triggerCrashSequence = (gForce: number) => {
    stopSensors();
    setGForceReading(gForce);
    setCrashDetected(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const resetCrash = () => {
    setCrashDetected(false);
    startSensors();
  };

  return { crashDetected, gForceReading, resetCrash };
}
