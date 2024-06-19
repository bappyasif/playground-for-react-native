import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Stack, useFocusEffect } from 'expo-router'
import { Camera, PhotoFile, TakePhotoOptions, VideoFile, useCameraDevice, useCameraPermission, useCodeScanner, useMicrophonePermission } from 'react-native-vision-camera'
import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { ResizeMode, Video } from "expo-av"

const CameraScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()

    const { hasPermission: hasMicrophonePermission, requestPermission: requestMicrophonePermission } = useMicrophonePermission()

    // const device = useCameraDevice('back')
    const device = useCameraDevice('front', {
        physicalDevices: ["ultra-wide-angle-camera"]
    })

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`)
        }
    })

    // const isFocused = useIsFocused()
    // const appState = useAppState()
    // const isActive = isFocused && appState === "active"

    const [isActive, setIsActive] = useState(false)

    const [photo, setPhoto] = useState<PhotoFile>()

    const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off")

    const [isRecording, setIsRecording] = useState(false)

    const [video, setVideo] = useState<VideoFile>()

    const [mode, setMode] = useState("camera")

    const ref = useRef<Camera>(null)

    const uploadPhoto = async () => {
        if (!photo) {
            return
        }

        const result = await fetch(`file://${photo.path}`)
        const data = await result.blob();
        console.log(data, "data")
        // upload data to network storage (ex: s3, supabase storage, etc)
    }

    const onTakePicturePressed = async () => {
        if (isRecording) {
            ref.current?.stopRecording();
            return
        }

        const photo = await ref.current?.takePhoto({
            flash: flash
        })

        console.log("picture taken!!", photo)

        setPhoto(photo)
    }

    const onStartRecording = async () => {
        console.log("recording!!")

        if (!ref.current) {
            return
        }

        if (isRecording) {
            // setIsRecording(false)
            console.log("here~~")
            ref.current?.stopRecording();
            // return
        }

        setIsRecording(true)

        ref.current.startRecording({
            flash: flash === "on" ? "on" : "off",
            onRecordingFinished: (video) => {
                console.log(video)
                setIsRecording(false)
                setVideo(video)
            },
            onRecordingError: (error) => {
                console.error(error)
                setIsRecording(false)
            }
        })
    }

    useFocusEffect(useCallback(() => {
        setIsActive(true)

        return () => {
            setIsActive(false)
        }
    }, []))

    useEffect(() => {
        if (!hasPermission) {
            requestPermission()
        }

        if (!hasMicrophonePermission) {
            requestMicrophonePermission()
        }
    }, [hasPermission, hasMicrophonePermission])

    if (!hasPermission || !hasMicrophonePermission) {
        return (
            <ActivityIndicator />
        )
    }

    if (!device) {
        return <Text>Camera device not found!!</Text>
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                codeScanner={codeScanner}
                isActive={isActive && !photo && !video && mode === "qr"}
            />

            <Camera
                ref={ref}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive && !photo && !video && mode === "camera"}
                photo={true}
                video={true}
                audio={true}
            /> */}

            {
                mode === "qr"
                    ? <Camera
                        style={StyleSheet.absoluteFill}
                        device={device}
                        codeScanner={codeScanner}
                        isActive={true}
                    />
                    : (
                        <Camera
                            ref={ref}
                            style={StyleSheet.absoluteFill}
                            device={device}
                            // codeScanner={codeScanner}
                            // isActive={true}
                            isActive={isActive && !photo}
                            photo={true}
                            video={true}
                            audio={true}
                        />
                    )
            }

            {/* <Camera
                ref={ref}
                style={StyleSheet.absoluteFill}
                device={device}
                codeScanner={codeScanner}
                // isActive={true}
                isActive={isActive && !photo}
                photo={true}
                video={true}
                audio={true}
            /> */}

            {
                video
                    ? (
                        <Video
                            // ref={video}
                            style={StyleSheet.absoluteFill}
                            source={{
                                uri: video.path
                                // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                            }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                        // onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                    ) : null
            }

            {
                photo
                    ? (
                        <>
                            <Image source={{ uri: photo.path }} style={StyleSheet.absoluteFill} />
                            <FontAwesome5 name="arrow-left" size={26} style={styles.close} onPress={() => setPhoto(undefined)} />

                            <View style={styles.upload}>
                                <Button onPress={uploadPhoto} title='Upload' />
                            </View>
                        </>
                    ) : (
                        null
                        // <>
                        //     <View style={styles.flash}>
                        //         <Ionicons
                        //             name={flash === "off" ? "flash-off" : 'flash'} size={24} color={"black"}
                        //             onPress={() => setFlash((curr) => (curr === "off" ? "on" : "off"))}
                        //         />
                        //     </View>
                        //     {/* <Camera
                        //         ref={ref}
                        //         style={StyleSheet.absoluteFill}
                        //         device={device}
                        //         // isActive={true}
                        //         isActive={isActive}
                        //         photo={true}
                        //     /> */}
                        //     <Pressable
                        //         style={[styles.capture, { backgroundColor: isRecording ? "red" : "floralwhite" }]}
                        //         onPress={onTakePicturePressed}
                        //         onLongPress={onStartRecording}
                        //     />

                        //     {/* simulator is not respondng to recording correctly!! */}
                        //     {/* <Pressable
                        //         style={[styles.capture, { backgroundColor: isRecording ? "red" : "floralwhite" }]}
                        //         // onPress={onTakePicturePressed}
                        //         onPress={onStartRecording}
                        //     /> */}
                        // </>
                    )
            }

            {
                !photo && !video
                    ? (
                        <>
                            <View style={[styles.flash, { gap: 31 }]}>
                                <Ionicons
                                    name={flash === "off" ? "flash-off" : 'flash'} size={24} color={"black"}
                                    onPress={() => setFlash((curr) => (curr === "off" ? "on" : "off"))}
                                />

                                <Ionicons
                                    name={mode === "camera" ? "qr-code-sharp" : "camera"} size={24} color={"black"}
                                    onPress={() => setMode(mode === "qr" ? "camera" : "qr")}
                                />
                            </View>

                            <Pressable
                                style={[styles.capture, { backgroundColor: isRecording ? "red" : "floralwhite" }]}
                                onPress={onTakePicturePressed}
                                onLongPress={onStartRecording}
                            />
                        </>
                    ) : null
            }

            {/* <Camera
                ref={ref}
                style={StyleSheet.absoluteFill}
                device={device}
                // isActive={true}
                isActive={isActive}
                photo={true}
            />
            <Pressable style={styles.capture} onPress={onTakePicturePressed} /> */}

            {/* {
                isActive
                    ? (
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            // isActive={true}
                            isActive={isActive}
                        />
                    )
                    : null
            } */}
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    capture: {
        position: "absolute",
        alignSelf: "center",
        bottom: 51,
        width: 75,
        height: 75,
        backgroundColor: "floralwhite",
        borderRadius: 75
    },
    close: {
        position: "absolute",
        top: 51,
        left: 31
    },
    flash: {
        position: "absolute",
        right: 10,
        top: 31,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    },
    upload: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 51,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    }
})