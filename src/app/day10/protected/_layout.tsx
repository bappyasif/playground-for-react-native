import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useBiometrics } from "@/components/day10/BiometricsProvider";

export default function BiometricallyProtectedScreenLayout () {
    const {isUnlocked, authenticate} =  useBiometrics()
    
    // moving this biometric check in context provider instead
    // const [unlocked, setUnlocked] = useState(false)

    useEffect(() => {
        if(!isUnlocked) [
            authenticate()

            //  we can also introduce timer contraint for invoking authenticate for users on top of this for extra protection
        ]
    }, [isUnlocked])

    // const authenticate = async () => {
    //     // const enrolled = await LocalAuthentication.getEnrolledLevelAsync()
    //     // const supported = await LocalAuthentication.supportedAuthenticationTypesAsync()
    //     // console.log("support", supported, "enrolled", enrolled)

    //     const hasHardware = await LocalAuthentication.hasHardwareAsync()

    //     if(!hasHardware) {
    //         Alert.alert("biometric authentication not supported!!")
    //         return;
    //     }

    //     const res = await LocalAuthentication.authenticateAsync()
    //     console.log(res)
    //     if(res.success) {
    //         setUnlocked(res.success)
    //     }
    // }

    if(!isUnlocked) {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontFamily: "Inter", fontSize: 27, marginBottom: 20}}>use biometrics to unlock!!</Text>
                <Entypo onPress={authenticate} name="fingerprint" size={80} color="grey" />
            </View>
        )
    }

    return (
        // null
        <Slot />
    )
}