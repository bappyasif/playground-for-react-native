import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ResizeMode, Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const dummyPosts = [
    {
        id: '2',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
        caption: 'Caption of the post',
    },
    {
        id: '1',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
        caption: 'Hey there',
    },
    {
        id: '3',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
        caption: 'Hola',
    },
    {
        id: '4',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
        caption: 'Piano practice',
    },
    {
        id: '5',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
        caption: 'Hello World!',
    },
];

const FeedScreen = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <StatusBar style='auto' />

            <Video
                source={{ uri: dummyPosts[0].video }}
                style={[StyleSheet.absoluteFill, styles.video]}
                resizeMode={ResizeMode.COVER}
                useNativeControls
            />

            <View style={styles.content}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.footer}>
                        <Text style={styles.caption}>{dummyPosts[0].caption}</Text>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default FeedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    video: {},
    control: {},
    content: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 10
    },
    footer: {
        marginTop: "auto",
    },
    caption: {
        fontSize: 20,
        color: "whitesmoke",
        fontFamily: "Inter"
    }
})