import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type VideoPost = {
    videoPost: {
        id: string,
        video: string,
        caption: string
    },
    activePostId: string
}

const VideoPost = ({ videoPost, activePostId }: VideoPost) => {
    const video = useRef<Video>(null)

    const [status, setStatus] = useState<AVPlaybackStatus>()

    const isPlaying = status?.isLoaded && status.isPlaying;

    const { height } = useWindowDimensions()

    useEffect(() => {
        if (!video.current) {
            return
        }

        if (activePostId !== videoPost.id) {
            video.current.pauseAsync()
        }
        
        if (activePostId === videoPost.id) {
            video.current.playAsync()
        }
    }, [activePostId, video.current])

    const onPressed = () => {
        if (!video.current) {
            return
        }

        if (isPlaying) {
            video.current.pauseAsync()
        } else {
            video.current.playAsync()
        }
    }

    return (
        <View style={[styles.container, { height: height }]}>
            <Video
                ref={video}
                source={{ uri: videoPost.video }}
                style={[StyleSheet.absoluteFill, styles.video]}
                resizeMode={ResizeMode.COVER}
                useNativeControls
                // onPlaybackStatusUpdate={status => setStatus(() => status)}
                onPlaybackStatusUpdate={setStatus}
                isLooping
            />

            <Pressable onPress={onPressed} style={styles.content}>
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
                    style={[StyleSheet.absoluteFillObject, styles.overlay]}
                />

                {
                    !isPlaying
                        ? <Ionicons name="play" size={71} color="rgba(255,255,255,0.6)" style={{ position: "absolute", top: "50%", alignSelf: "center" }} />
                        : null
                }

                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.footer}>
                        <View style={styles.leftColumn}>
                            {/* bottom: caption */}
                            <Text style={styles.caption}>{videoPost.caption}</Text>

                        </View>
                        {/* vertical collumn of icon-buttons */}
                        <View style={styles.rightColumn}>
                            <Ionicons name="heart" size={31} color="whitesmoke" />
                            <Ionicons name="share-social-sharp" size={31} color="whitesmoke" />
                            <Ionicons name="bookmark" size={31} color="whitesmoke" />
                        </View>
                    </View>
                </SafeAreaView>
            </Pressable>
        </View>
    )
}

export default VideoPost

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    video: {},
    control: {},
    content: {
        flex: 1,
        // backgroundColor: "rgba(0,0,0,0.2)",
        padding: 10
    },
    overlay: {
        top: "50%"
    },
    footer: {
        marginTop: "auto",
        flexDirection: "row",
        alignItems: "flex-end"
    },
    caption: {
        fontSize: 20,
        color: "whitesmoke",
        fontFamily: "Inter"
    },
    leftColumn: {
        flex: 1
    },
    rightColumn: {
        gap: 11
    }
})