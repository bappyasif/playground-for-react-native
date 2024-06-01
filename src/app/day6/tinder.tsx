import { View, Text } from 'react-native'
import React from 'react'
import TinderCard from '@/components/day6/tinder-card'
import { Stack } from 'expo-router';
import { useSharedValue } from 'react-native-reanimated';

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

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Stack.Screen options={{headerShown: false}} />

            {dummyUsers.map((user, idx) => <TinderCard key={user.id} user={user} numOfCards={dummyUsers.length} currIndex={idx} activeIndex={activeIndex} />)}
            {/* <TinderCard /> */}
        </View>
    )
}

export default TinderSwipeScreen