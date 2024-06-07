import { useState } from 'react';
import { View, StyleSheet, Button, FlatList, Text, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Recording } from 'expo-av/build/Audio';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import MemoListItem from '@/components/day7/memoListItem';

export default function MemosScreen() {
    const [recording, setRecording] = useState<Recording>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    // keeping tracks of all recorded memos
    const [memos, setMemos] = useState<string[]>([])

    // keeping a shared value for sound metering values
    const metering = useSharedValue(-100)

    async function startRecording() {
        try {
            if (!permissionResponse) {
                return
            }

            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            // const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            // );
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY,
                undefined,
                1000 / 60
            );
            setRecording(recording);
            console.log('Recording started');

            recording.setOnRecordingStatusUpdate((status) => {
                console.log(status.metering)
                metering.value = status.metering || -100
            })
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (!recording) {
            return
        }
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);

        if (uri) {
            setMemos(existingMemos => [uri, ...existingMemos])
        }
    }

    // with animation
    const animatedRedCircle = useAnimatedStyle(() => ({
        // width: recording ? "60%" : "100%"

        width: withTiming(recording ? "60%" : "100%"),
        borderRadius: withTiming(recording ? 5 : 35),
    }))

    const animateRecWave = useAnimatedStyle(() => {
        // const size = -6
        // const size = interpolate(metering.value, [-160, -60, 0], [0, 0, -100])
        // const size = withSpring(interpolate(metering.value, [-160, -60, 0], [0, 0, -30]))
        const size = withTiming(interpolate(metering.value, [-160, -60, 0], [0, 0, -30]), {duration: 100})

        return {
            top: size,
            bottom: size,
            left: size,
            right: size
        }
    })

    return (
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem={({ item }) => <MemoListItem uri={item} />}
            />

            <View style={styles.footer}>
                <View>
                    <Animated.View style={[styles.recWave, animateRecWave]} />
                    <Pressable
                        style={styles.recordBtn}
                        onPress={recording ? stopRecording : startRecording}
                    >
                        <Animated.View style={[styles.redCircle, animatedRedCircle]} />
                    </Pressable>
                </View>
            </View>
            {/* <View style={styles.footer}>
                <Pressable 
                    style={styles.recordBtn}
                    onPress={recording ? stopRecording : startRecording}
                >
                    <Animated.View style={[styles.redCircle, animatedRedCircle]} />

                    {/* <View style={[styles.redCircle, {width: recording ? "60%" : "100%"}]} /> */}

            {/* <View style={[styles.redCircle, {width: recording ? 30 : 60}]} /> /}
                </Pressable>
            </View> */}

            {/* <View style={styles.footer}>
                <Pressable 
                    style={styles.recordBtn}
                    onPress={recording ? stopRecording : startRecording}
                />
            </View> */}
            {/* <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
    footer: {
        backgroundColor: "#fff",
        height: 150,
        alignItems: "center",
        justifyContent: "center"
    },
    recordBtn: {
        // backgroundColor: "orangered",
        width: 60,
        height: 60,

        borderRadius: 60,
        borderWidth: 3,
        borderColor: "grey",
        padding: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    redCircle: {
        backgroundColor: "orangered",
        // width: 60,
        // height: 60,
        aspectRatio: 1,
        borderRadius: 30
    },
    recWave: {
        backgroundColor: "#ff000055",
        // position: "absolute",
        ...StyleSheet.absoluteFillObject,
        top: -20,
        bottom: -20,
        left: -20,
        right: -20,
        // zIndex: 20
        borderRadius: 60
    }
});