import { StatusBar, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Stack } from 'expo-router';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
      <Stack.Screen options={{headerShown: false}} />
      <LottieView
        autoPlay
        style={{
          width: "72%",
          maxWidth: 400,
          // width: 200,
          height: 180,
          // backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        // source={require('/assets/lottie/netflix-ssa.json')}
        source={require('@assets/lottie/netflix-ssa.json')}

        // source={require('@assets/lottie/netflix-ssa.lottie')}
      />

      <StatusBar barStyle={"default"} />

    </View>
  )
}

export default SplashScreen