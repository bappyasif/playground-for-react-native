import { View, Text } from 'react-native'
import React from 'react'
import TinderCard from '@/components/day6/tinder-card'
import { Stack } from 'expo-router';
import { interpolate, useDerivedValue, useSharedValue, withDecay, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const dummyUsers = [
    {
        id: 1,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg',
        name: 'Dani',
    },
    {
        id: 2,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg',
        name: 'Jon',
    },
    {
        id: 3,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg',
        name: 'Dani',
    },
    {
        id: 4,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg',
        name: 'Alice',
    },
    {
        id: 5,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg',
        name: 'Dani',
    },
    {
        id: 6,
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg',
        name: 'Kelsey',
    },
];

const TinderSwipeScreen = () => {
    const activeIndex = useSharedValue(0)

    const translationX = useSharedValue(0)

    // useDerivedValue(() => {
    //     activeIndex.value = interpolate(
    //         Math.abs(translationX.value),
    //         [0, 500],
    //         [0, activeIndex.value + 1]
    //     )
    // })

    const panGesture = Gesture.Pan()
    // this will get movement along x axis for any pan gesture on cards
    .onChange(event => {
        // console.log(event.translationX)
        translationX.value = event.translationX
    })
    // when we are finished with a movement this will trigger and we will use a spring effect before coming to its initial position
    .onEnd(event => {
        if(Math.abs(event.velocityX) > 400) {
            translationX.value = withSpring(Math.sign(event.velocityX) * 500, {velocity: event.velocityX}, (finished) => {
                if(finished) {
                    // activeIndex.value = withSpring(activeIndex.value + 1)
                    translationX.value = 0
                }
            })
            
            // console.log(event.velocityX, "velovity")
            // translationX.value = withDecay({velocity: event.velocityX})

            // alternatively better way to go about it
            // translationX.value = withSpring(Math.sign(event.velocityX) * 500, {velocity: event.velocityX})

            // moving next current index on view from cards
            //  we have top move outside of this scope otherwise it wll stop after first move
            // activeIndex.value = interpolate(
            //     translationX.value,
            //     [Math.abs(event.velocityX) * 500, 0],
            //     [activeIndex.value + 1, 0]
            // )
        }

        activeIndex.value = withSpring(activeIndex.value + 1)

        translationX.value = withSpring(0)
    })

    return (
        <GestureDetector gesture={panGesture}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Stack.Screen options={{ headerShown: false }} />

                {dummyUsers.map((user, idx) => <TinderCard key={user.id} user={user} numOfCards={dummyUsers.length} currIndex={idx} activeIndex={activeIndex} translationX={translationX} />)}
                {/* <TinderCard /> */}
            </View>
        </GestureDetector>
    )
}

export default TinderSwipeScreen