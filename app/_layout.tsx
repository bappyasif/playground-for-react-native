import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from "expo-secure-store"
import { useAuth, ClerkProvider } from "@clerk/clerk-expo"

const Clerk_Publishable_Key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "mont-r": require('../assets/fonts/Montserrat-Regular.ttf'),
    "mont-b": require('../assets/fonts/Montserrat-Bold.ttf'),
    "mont-sb": require('../assets/fonts/Montserrat-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={Clerk_Publishable_Key!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  )
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login")
    }
  }, [isLoaded])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='(modals)/login' options={{
        presentation: "modal", title: "Log in or Sign up",
        headerTitleStyle: { fontFamily: "mont-sb" },
        headerLeft: () => {
          return (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close-outline' size={20} />
            </TouchableOpacity>
          )
        }
      }} />
      <Stack.Screen
        name='listing/[id]'
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name='(modals)/bookings'
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={20} />
              </TouchableOpacity>
            )
          }
        }}
      />
    </Stack>
  );
}
