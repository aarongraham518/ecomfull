import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 hides header for all stack screens
        // presentation: 'modal'
      }}
    />
  );
}
