import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { darkMapStyle } from '../../constants/mapStyle';
import { useLiveLocation } from '../../hooks/useLiveLocation';
import { COLORS } from '../../constants/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export function LiveMap() {
  const { location, errorMsg } = useLiveLocation();
  const mapRef = useRef<MapView>(null);

  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.8);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(2.5, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    pulseOpacity.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          pitch: 45,
          heading: location.coords.heading || 0,
          altitude: 1000,
          zoom: 16,
        },
        { duration: 1000 }
      );
    }
  }, [location]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: 'white' }}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={darkMapStyle}
        showsUserLocation={false}
        showsCompass={false}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: location?.coords.latitude || 28.6139,
          longitude: location?.coords.longitude || 77.209,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.markerContainer}>
              <Animated.View style={[styles.markerPulse, animatedPulseStyle]} />
              <View style={styles.markerCore} />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerPulse: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.active,
  },
  markerCore: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: COLORS.active,
    shadowColor: COLORS.active,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
});
