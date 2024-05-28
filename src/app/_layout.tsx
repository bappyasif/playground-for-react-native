import { Slot, Stack } from "expo-router";
import 'react-native-reanimated';
import { useFonts, Inter_900Black, Inter_600SemiBold, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { AmaticSC_700Bold as AmaticBold, AmaticSC_400Regular as AmaticRegular } from "@expo-google-fonts/amatic-sc"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  return (
    // so thatg we can have seamless geture based screen navigation on top of stack navigation for onboarding screens or elsewhere if needed
    <GestureHandlerRootView style={{flex: 1}}>
        {/* // seamless stack navigation screen */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "maroon" },
          headerTintColor: "#fff"
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Devember"
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}

// export default function RootLayout() {
//     return (
//         // seamless stack navigation screen
//         <Stack
//             screenOptions={{
//                 // this title will show in every screens
//                 title: "Devember",
//                 headerStyle: { backgroundColor: "maroon" },
//                 headerTintColor: "#fff"
//             }}
//         />

//         // seamless tabs navigator between screens
//         // <Slot screenOptions={{
//         //     title: "Devember",
//         // }} />
//     )
// }