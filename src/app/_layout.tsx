import { Slot, Stack } from "expo-router";
import 'react-native-reanimated';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { AmaticSC_700Bold as AmaticBold, AmaticSC_400Regular as AmaticRegular } from "@expo-google-fonts/amatic-sc"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import AnimatedSplashScreen from "@/components/day4/animated-screen";
import Animated, { FadeIn } from "react-native-reanimated";
import BiometricProvider from "@/components/day10/BiometricsProvider";

import { Amplify } from "aws-amplify"
import amplifyconfig from '@/amplifyconfiguration.json';

import { Authenticator, Theme, ThemeProvider } from "@aws-amplify/ui-react-native"

Amplify.configure(amplifyconfig);

const theme: Theme = {
  tokens: {
    colors: {
      // background: {
      //   primary: `floralwhite`
      // },
      background: {
        // This will resolve to #fff in light mode
        // and #000 in dark mode because of the override below
        primary: '{colors.gray}'
      },
      font: {
        primary: 'red'
      }
    }
  }
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false)
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false)

  let [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black,
    InterReg: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    Amatic: AmaticRegular,
    AmaticBold: AmaticBold
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // SplashScreen.hideAsync();
      setAppReady(true);
      // console.log("fu nnottt")
    }
  }, [fontsLoaded, fontError]);

  const showAnimatedSplash = !appReady || !splashAnimationFinished;

  if (showAnimatedSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          // console.log("fu", isCancelled)
          // setSplashAnimationFinished(true);
          if (!isCancelled) {
            setSplashAnimationFinished(true);
            // console.log("fu !!")
            // setAppReady(true);
            SplashScreen.hideAsync();
          }
        }}
      />
    );
  }

  return (
    <Authenticator.Provider>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Animated.View style={{ flex: 1 }} entering={FadeIn}>
            <Stack screenOptions={{}}>
              <Stack.Screen name="index" options={{ title: 'DEVember' }} />
            </Stack>
          </Animated.View>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Authenticator.Provider>
  )

  // if (!fontsLoaded && !fontError) {
  //   return <ActivityIndicator />;
  // }

  // return (
  //   // so thatg we can have seamless geture based screen navigation on top of stack navigation for onboarding screens or elsewhere if needed
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     {/* // seamless stack navigation screen */}
  //     <Stack
  //       screenOptions={{
  //         headerStyle: { backgroundColor: "maroon" },
  //         headerTintColor: "#fff"
  //       }}
  //     >
  //       <Stack.Screen
  //         name="index"
  //         options={{
  //           title: "Devember"
  //         }}
  //       />
  //     </Stack>
  //   </GestureHandlerRootView>
  // )
}