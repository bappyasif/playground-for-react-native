import { Slot, Stack } from "expo-router";
import 'react-native-reanimated';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {AmaticSC_700Bold as AmaticBold, AmaticSC_400Regular as AmaticRegular} from "@expo-google-fonts/amatic-sc"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    let [fontsLoaded, fontError] = useFonts({
        Inter: Inter_900Black,
        Amatic: AmaticRegular,
        AmaticBold: AmaticBold
      });
    
      useEffect(() => {
        if(fontsLoaded || fontError) {
          SplashScreen.hideAsync()
        }
      }, [fontsLoaded, fontError])
    
      if (!fontsLoaded && !fontError) {
        return <ActivityIndicator />;
      }

    return (
        // seamless stack navigation screen
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