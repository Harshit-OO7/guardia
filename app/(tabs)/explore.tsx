import { Redirect } from 'expo-router';

// The explore tab from the default template is not used in Guardia.
// Redirect to the main home screen.
export default function Explore() {
  return <Redirect href="/(tabs)" />;
}
