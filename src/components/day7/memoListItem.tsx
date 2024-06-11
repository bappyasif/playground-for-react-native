import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesome5 } from "@expo/vector-icons"
import { Sound } from 'expo-av/build/Audio';
import { AVPlaybackStatus, Audio } from 'expo-av';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const MemoListItem = ({ memo }: { memo: { uri: string, metering: number[] } }) => {
    const [sound, setSound] = useState<Sound>();
    const [status, setStatus] = useState<AVPlaybackStatus>()

    const loadSound = async () => {
        console.log('Loading Sound');
        // when donw through file stored in assets folder
        // const { sound } = await Audio.Sound.createAsync(require('./assets/Hello.mp3')
        // );

        const { sound } = await Audio.Sound.createAsync(
            { uri: memo.uri },
            // so that update and withTime progression happens in same time perios and makes transition a lot more smoother
            // {progressUpdateIntervalMillis: 50},
            { progressUpdateIntervalMillis: 1000 / 60 },
            // undefined,
            _onPlaybackStatusUpdate
        );
        setSound(sound);
    }

    useEffect(() => {
        loadSound()
    }, [memo])

    const _onPlaybackStatusUpdate = useCallback(async (newStatus: AVPlaybackStatus) => {
        // console.log(JSON.stringify(status, null, 2))
        setStatus(newStatus)

        if (!newStatus.isLoaded) {
            return
        }

        if (newStatus.didJustFinish) {
            //    sound?.replayAsync() 
            // console.warn("restart!!")
            await sound?.setPositionAsync(0)
            // await sound?.setStatusAsync({ positionMillis: 0 })
        }
    }, [sound])

    async function playSound() {
        if (!sound) {
            return
        }

        console.log('Playing Sound');
        // await sound.playAsync();

        if (status?.isLoaded && status.isPlaying) {
            await sound.pauseAsync()
        } else {
            await sound.replayAsync();
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const isPlaying = status?.isLoaded ? status.isPlaying : false

    const position = status?.isLoaded ? status.positionMillis : 0;

    const duration = status?.isLoaded ? status.durationMillis : 1;

    // const progress = 40
    const progress = position / duration!

    const formatMillis = (millis: number) => {
        const minutes = Math.floor(millis / (1000 * 60))
        const seconds = Math.floor((millis % (1000 * 60)) / 1000)

        return `${minutes}:${seconds < 10 ? "0" : ''}${seconds}`
    }

    const animatedSeekerStyle = useAnimatedStyle(() => ({
        left: withTiming(`${progress * 100}%`, { duration: status?.isLoaded && status.progressUpdateIntervalMillis || 100 })
    }))

    // we're capping large or small recording audio metering array to have some more selective few items for wave lines representation
    const lines = []
    const numLines = 40

    for (let i = 0; i < numLines; i++) {
        const meteringIdx = Math.floor((i * memo.metering.length) / numLines)
        lines.push(meteringIdx)

        const nextMeeteringIndex = Math.ceil(((i + 1) * memo.metering.length) / numLines)

        const values = memo.metering.slice(meteringIdx, nextMeeteringIndex)

        const average = values.reduce((sum, acc) => sum + acc, 0)/ values.length

        lines.push(average)

        // lines.push(meteringIdx)
    }

    return (
        <View style={styles.container}>
            <FontAwesome5 onPress={playSound} name={isPlaying ? "pause" : "play"} size={20} color={"grey"} />

            <View style={styles.playbackCont}>

                {/* we will be using more dynamic wave lines instead */}
                {/* <View style={styles.playbackBg} /> */}

                <View style={styles.wave}>
                    {lines.map((db, idx) => <View key={idx} style={[styles.waveLine, { height: interpolate(db, [-60, 0], [4, 49], Extrapolation.CLAMP) }, {backgroundColor: progress > idx / lines.length ? "royalblue" : "gainsboro"}]} />)}
                    {/* {memo.metering.map((db, idx) => <View key={idx} style={[styles.waveLine, {height: interpolate(db, [-60, 0], [4, 49], Extrapolation.CLAMP)}]} />)} */}
                </View>

                <Animated.View style={[styles.playbackSeeker, animatedSeekerStyle]} />

                {/* <View style={[styles.playbackSeeker, { left: `${progress * 100}%` }]} /> */}

                {/* <View style={[styles.playbackSeeker, { left: `${progress}%` }]} /> */}

                {/* <Text style={{position: "absolute", bottom: 0, right: 0, color: "grey", fontSize: 12}}>{formatMillis(duration!)}</Text> */}

                <Text style={{ position: "absolute", bottom: 0, right: 0, color: "grey", fontSize: 12 }}>{formatMillis(position!)} / {formatMillis(duration!)}</Text>
            </View>
        </View>
    )
}

export default MemoListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: "floralwhite",
        margin: 6,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 13,
        gap: 15,

        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    playbackCont: {
        flex: 1,
        height: 80,
        justifyContent: "center",
        backgroundColor: "whitesmoke"
    },
    playbackBg: {
        height: 3,
        backgroundColor: "gainsboro",
        borderRadius: 5
    },
    playbackSeeker: {
        width: 13,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: "royalblue",
        position: "absolute",
        // left: "50%"
    },
    wave: {
        flexDirection: "row",
        gap: 2,
        alignItems: "center"
    },
    waveLine: {
        flex: 1,
        height: 20,
        backgroundColor: "gainsboro",
        borderRadius: 20
    }
})