import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Stack, useFocusEffect } from 'expo-router'
import { Camera, PhotoFile, TakePhotoOptions, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { FontAwesome5, Ionicons } from "@expo/vector-icons"

const CameraScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()

    // const device = useCameraDevice('back')
    const device = useCameraDevice('front', {
        physicalDevices: ["ultra-wide-angle-camera"]
    })

    // const isFocused = useIsFocused()
    // const appState = useAppState()
    // const isActive = isFocused && appState === "active"

    const [isActive, setIsActive] = useState(false)

    const [photo, setPhoto] = useState<PhotoFile>()

    const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off")

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
        const photo = await ref.current?.takePhoto({
            flash: flash
        })
        console.log("picture taken!!", photo)
        setPhoto(photo)
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
    }, [hasPermission])

    if (!hasPermission) {
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

            <Camera
                ref={ref}
                style={StyleSheet.absoluteFill}
                device={device}
                // isActive={true}
                isActive={isActive && !photo}
                photo={true}
            />

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
                        <>
                            <View style={styles.flash}>
                                <Ionicons name={flash === "off" ? "flash-off" : 'flash'} size={24} color={"black"} onPress={() => setFlash((curr) => (curr === "off" ? "on" : "off"))} />
                            </View>
                            {/* <Camera
                                ref={ref}
                                style={StyleSheet.absoluteFill}
                                device={device}
                                // isActive={true}
                                isActive={isActive}
                                photo={true}
                            /> */}
                            <Pressable style={styles.capture} onPress={onTakePicturePressed} />
                        </>
                    )
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