// Web stub — expo-sms, expo-location, expo-haptics not available on web
export function useSOSFlow() {
  return {
    triggerSOS: async () => { alert('SOS is only available on the mobile app.'); },
    cancelSOS: async () => {},
    isSending: false,
  };
}
