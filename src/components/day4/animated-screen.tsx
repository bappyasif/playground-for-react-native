import { View } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';
import Animated, {
    FadeIn,
    FadeOut,
    ZoomIn,
    ZoomOut,
  } from 'react-native-reanimated';
  
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
  
  const AnimatedSplashScreen = ({
    onAnimationFinish = (isCancelled) => {},
  }: {
    onAnimationFinish?: (isCancelled: boolean) => void;
  }) => {
    const animation = useRef<LottieView>(null);
  
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
      >
        <AnimatedLottieView
          exiting={ZoomOut}
          entering={FadeIn}
          ref={animation}
          onAnimationFinish={onAnimationFinish}
          loop={false}
          autoPlay
        //   style={{
        //     width: '80%',
        //     maxWidth: 400,
        //     height: 200
        //   }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('@assets/lottie/netflix-ssa.json')}
        />
      </View>
    );
  };
  
  export default AnimatedSplashScreen;


// import { View } from 'react-native'
// import React from 'react'
// import LottieView from 'lottie-react-native';

// const AnimatedSplashScreen = ({onAnimationFinish = (isCancelled) => null}: {onAnimationFinish: (isCancelled: boolean) => void}) => {
//   return (
//     <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
//       <LottieView
//         autoPlay
//         style={{
//           width: "72%",
//           maxWidth: 400,
//           // width: 200,
//           height: 180,
//           // backgroundColor: '#eee',
//         }}
//         // Find more Lottie files at https://lottiefiles.com/featured
//         // source={require('/assets/lottie/netflix-ssa.json')}
//         source={require('@assets/lottie/netflix-ssa.json')}

//         // source={require('@assets/lottie/netflix-ssa.lottie')}
//         // onAnimationFinish={() => console.warn("done!!")}
//         // onAnimationFinish={onAnimationFinish}
//         onAnimationFinish={onAnimationFinish}
//         loop={false}
//       />

//       {/* <StatusBar barStyle={"default"} /> */}    

//     </View>
//   )
// }

// export default AnimatedSplashScreen