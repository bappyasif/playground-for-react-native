import IgStories from '@/components/day18/IgStories';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren, ReactNode } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Image,
} from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import userStories from "assets/data/day18/stories"

const allStories = userStories.flatMap(user => user.stories)

const pages = ["#eqf3fa", "#388d46", "red", "yellow", "blue"]

const width = 200;

const AnimatedPage = ({ pgClr, pageIndex, index, children }: { pgClr: string, pageIndex: SharedValue<number>, index: number, children: ReactNode }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        // perspective: 301
        perspective: width * 2
      },
      {
        rotateY: `${interpolate(pageIndex.value, [index - 1, index, index + 1], [90, 0, -90])}deg`
        // rotateY: "-70deg"
        // rotateZ: "45deg"
      }
    ]
  }))

  return (
    <Animated.View
      key={pgClr}
      style={[{
        width,
        zIndex: 100 - index,
        position: "absolute",
        aspectRatio: 9 / 16,
        backgroundColor: pgClr,
        borderRadius: 10,
        backfaceVisibility: "hidden",
        overflow: "hidden",
        transformOrigin: ["50%", "50%", -width / 2],
      }, animatedStyle]}
    >
      {children}
    </Animated.View>
  )
}

export default function InstaStories() {
  // const width = 200;
  // const progress = useSharedValue(0);
  const pageIndex = useSharedValue(0);

  const runAnimation = () => {
    // pageIndex.value = 0;
    // progress.value = withTiming(1);
    pageIndex.value = withTiming(Math.floor(pageIndex.value + 1), { duration: 299 });
  }

  const goBack = () => {
    // pageIndex.value = 0;
    // progress.value = withTiming(1);
    pageIndex.value = withTiming(Math.floor(pageIndex.value - 1), { duration: 501 });
  }

  // const runAnimation = () => {
  //   progress.value = 0;
  //   // progress.value = withTiming(1);
  //   progress.value = withTiming(1, { duration: 2999 });
  // }

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       perspective: 301
  //     },
  //     {
  //       rotateY: `${interpolate(progress.value, [0, 1], [-90, 90])}deg`
  //       // rotateY: "-70deg"
  //       // rotateZ: "45deg"
  //     }
  //   ]
  // }))

  return (
    <SafeAreaView style={styles.container}>
      {/* <IgStories /> */}
      <StatusBar style='light' />
      {/* <IgStories /> */}

      {/* {
        pages.map((pgClr, idx) => (
          <AnimatedPage pgClr={pgClr} key={idx} pageIndex={pageIndex} index={idx} />
          // <Animated.View
          //   key={pgClr}
          //   style={[{
          //     width, position: "absolute",
          //     aspectRatio: 9 / 16, backgroundColor: pgClr, borderRadius: 10,
          //     // backfaceVisibility: "hidden",
          //     transformOrigin: ["50%", "50%", -width / 2],
          //   }, animatedStyle]}
          // />
        ))
      } */}

      {
        allStories.map((story, idx) => (
          <AnimatedPage pgClr={"black"} key={idx} pageIndex={pageIndex} index={idx}>
            <Image source={{ uri: story.uri }} style={{ flex: 1 }} />
          </AnimatedPage>
        ))
      }

      <View style={{ position: "absolute", bottom: 51, flexDirection: "row" }}>
        <Button title='Prev' onPress={goBack} />
        <Button title='Next' onPress={runAnimation} />
      </View>

      {/* <Animated.View 
        style={[{
          width, aspectRatio: 9/16, backgroundColor: "#e1f3fa", borderRadius: 10,
          // backfaceVisibility: "hidden",
          transformOrigin: ["50%", "50%", -width / 2],
        }, animatedStyle]} 
        /> */}
      {/* <Button title='Run Animation' onPress={runAnimation} /> */}

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