import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, router } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, FadeIn, FadeOut, FadingTransition, SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';

const onboardingSteps = [
  {
    icon: "snowflake",
    title: "Welcome #Devember",
    description: "Month long various react native hands on projects."
  },
  {
    icon: "people-arrows",
    title: "Learn and grow together",
    description: "Learn by doing 24 projects with react native and expo."
  },
  {
    icon: "book-reader",
    title: "Education for children",
    description: "Contribute to raise fund for this awsome cause from save the children organisation."
  }
]

const OnboardingScreen = () => {
  const [screenIdx, setScreenIdx] = useState(0)
  const data = onboardingSteps[screenIdx];

  const endOnboarding = () => {
    setScreenIdx(0)
    router.back()
  }

  const onContinue = () => {
    const isLastScreen = screenIdx === onboardingSteps.length - 1
    if (isLastScreen) {
      endOnboarding()
    } else {
      setScreenIdx(prev => prev + 1)
    }
  }

  const onBack = () => {
    const isFirstScreen = screenIdx === 0
    if (isFirstScreen) {
      endOnboarding()
    } else {
      setScreenIdx(prev => prev - 1)
    }
  }

  const swipeForward = Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue)

  const swipeBack = Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)

  const swipes = Gesture.Simultaneous(swipeBack, swipeForward)

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* so that out device clock and otyher status are visible on screen at top */}
      <StatusBar style='inverted' />

      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((item, idx) => <View style={[styles.stepIndicator, { backgroundColor: idx === screenIdx ? "#cef202" : "grey" }]} key={item.title} />)}
      </View>

      <GestureDetector gesture={swipes}>
        {/* it needs to be used with Animated.View otherwise it will crash */}
        {/* <View style={styles.content}> */}

        {/* we also need to give it a key index so that it understands whjich creen its rendering and trigger entering and exiting animation otherwise they wont */}
        <Animated.View 
          // entering={FadeIn} exiting={FadeOut} 
          key={screenIdx} 
          style={styles.content}>
            <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FontAwesome5 name={data.icon} size={150} color="#cef202" style={styles.image} />
            </Animated.View>
          {/* <FontAwesome5 name={data.icon} size={80} color="#cef202" style={styles.image} /> */}

          <View style={styles.footer}>
            {/* <Text style={styles.title}>{data.title}</Text> */}
            <Animated.Text entering={SlideInLeft.springify()} exiting={SlideOutRight} style={styles.title}>{data.title}</Animated.Text>
            {/* <Animated.Text entering={SlideInLeft.easing(Easing.elastic())} style={styles.title}>{data.title}</Animated.Text> */}
            {/* <Animated.Text entering={SlideInLeft.damping(400)} style={styles.title}>{data.title}</Animated.Text> */}
            
            {/* <Text style={styles.description}>{data.description}</Text> */}
            <Animated.Text entering={SlideInRight.delay(200)} exiting={SlideOutLeft.delay(150)} style={styles.description}>{data.description}</Animated.Text>

            <View style={styles.btnsRow}>
              <Text onPress={endOnboarding} style={styles.btnTxt}>Skip</Text>

              <Pressable style={styles.btn} onPress={onContinue}>
                <Text style={styles.btnTxt}>Continue</Text>
              </Pressable>
              {/* <Pressable style={styles.btn}>
              <Text style={styles.btnTxt}>Skip</Text>
            </Pressable> */}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141A",
    padding: 20
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 15
  },
  stepIndicator: {
    // width: 100,
    flex: 1,
    height: 3,
    backgroundColor: "grey",
    // margin: 5,
    borderRadius: 10
  },
  content: {
    flex: 1,
    padding: 20,
    // backgroundColor: "red"
  },
  title: {
    color: "#fdfdfd",
    fontSize: 31,
    fontFamily: "InterBold",
    letterSpacing: 4,
    marginVertical: 11
  },
  description: {
    color: "lightgray",
    fontSize: 18,
    fontFamily: "InterReg",
    lineHeight: 29
  },
  image: {
    alignSelf: "center",
    margin: 20,
    marginTop: 80
  },
  footer: {
    // margin: "auto",
    marginTop: "auto",
    // backgroundColor: "red",
  },
  btnsRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  },
  btn: {
    backgroundColor: "#302E38",
    // padding: 15,
    borderRadius: 50,
    alignItems: "center",
    flex: 1
  },
  btnTxt: {
    color: "#fdfdfd",
    fontFamily: "InterBold",
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 26
  },
});

export default OnboardingScreen