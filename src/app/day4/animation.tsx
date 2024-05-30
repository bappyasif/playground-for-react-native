import { View, Text, Button } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

const AnimationScreen = () => {
  const animation = useRef<LottieView>(null);
  return (
    <View>
      <LottieView
        // autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        // source={require('/assets/lottie/netflix-ssa.json')}
        source={require('@assets/lottie/netflix-ssa.json')}

        // source={require('@assets/lottie/netflix-ssa.lottie')}
      />
      <Button onPress={() => animation.current?.play()} title='Play' />
      <Button onPress={() => animation.current?.pause()} title='Pause' />
      <Button onPress={() => animation.current?.resume()} title='Resume' />
      <Button onPress={() => animation.current?.reset()} title='Reset' />
    </View>
  )
}

export default AnimationScreen