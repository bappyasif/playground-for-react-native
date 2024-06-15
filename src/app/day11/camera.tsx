import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useCameraPermission } from 'react-native-vision-camera'

const CameraScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()
    console.log(hasPermission, "hasPermission!!")
    
    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} />
            <Text>CameraScreen</Text>
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({})