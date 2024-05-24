import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { DayListItem } from './src/components/core/DayListItem';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import {AmaticSC_700Bold as AmaticBold, AmaticSC_400Regular as AmaticRegular} from "@expo-google-fonts/amatic-sc"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
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

  const nums = [...Array(20)].map((v,i) => i + 1)

  return (
    <View style={styles.container}>
      <FlatList 
         data={nums}
         contentContainerStyle={styles.content}
         renderItem={({item}) => (
          <DayListItem day={item} />
         )}
         numColumns={2}
         columnWrapperStyle={styles.column}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  
  content: {
    gap: 10,
    padding: 20
  },
  
  column: {
    gap: 10
  },
});
