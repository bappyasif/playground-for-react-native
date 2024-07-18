import IgStories from '@/components/day18/IgStories';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
} from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const pages = ["#eqf3fa", "#388d46"]

export default function InstaStories() {
  const width = 200;
  const progress = useSharedValue(0);
  const pageIndex = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        perspective: 301
      },
      {
        rotateY: `${interpolate(progress.value, [0, 1], [-90, 90])}deg`
        // rotateY: "-70deg"
        // rotateZ: "45deg"
      }
    ]
  }))
  const runAnimation = () => {
    progress.value = 0;
    // progress.value = withTiming(1);
    progress.value = withTiming(1, { duration: 2999 });
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <IgStories /> */}
      <StatusBar style='light' />
      {/* <IgStories /> */}

      {
        pages.map((pgClr) => (
          <Animated.View
            key={pgClr}
            style={[{
              width, position: "absolute",
              aspectRatio: 9 / 16, backgroundColor: pgClr, borderRadius: 10,
              // backfaceVisibility: "hidden",
              transformOrigin: ["50%", "50%", -width / 2],
            }, animatedStyle]}
          />
        ))
      }

      {/* <Animated.View 
        style={[{
          width, aspectRatio: 9/16, backgroundColor: "#e1f3fa", borderRadius: 10,
          // backfaceVisibility: "hidden",
          transformOrigin: ["50%", "50%", -width / 2],
        }, animatedStyle]} 
        /> */}
      <Button title='Run Animation' onPress={runAnimation} />

      {/* <View 
        style={{
          width, aspectRatio: 9/16, backgroundColor: "#e1f3fa", borderRadius: 10,
          // transformOrigin: ["center", "center", width / 2],
          transformOrigin: ["50%", "50%", -width / 2],
          transform: [
            {
              perspective: 301
            },
            {
              rotateY: "-70deg"
              // rotateZ: "45deg"
            }
          ]
        }} 
        /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center"
  }
});