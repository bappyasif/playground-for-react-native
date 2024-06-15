import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from "react-native";

// const BiometricsCtx = createContext({isUnlocked: false, authenticate: async() => null})

type ContextProps = {
    isUnlocked: boolean,
    // authenticate: () => void
    authenticate: () => Promise<void>
}

const BiometricsCtx = createContext<ContextProps>({isUnlocked: false, authenticate: async() => {}})

const BiometricProvider = ({children}: PropsWithChildren) => {
    const [unlocked, setUnlocked] = useState(false)

    // we dontr want this to be invoked right awy app mounts, we want that only when user is visiting to its protected route layout first
    // useEffect(() => {
    //     authenticate()
    // }, [])

    // using an  added layer of protection in every twenty seconds user will be requested to re use their biometrics login screen.
    useEffect(() => {
        if(unlocked) {
            const timer = setTimeout(() => {
                setUnlocked(false)
            }, 20000)
    
            return () => clearTimeout(timer)
        }
    }, [unlocked])

    const authenticate = async () => {
        // const enrolled = await LocalAuthentication.getEnrolledLevelAsync()
        // const supported = await LocalAuthentication.supportedAuthenticationTypesAsync()
        // console.log("support", supported, "enrolled", enrolled)

        const hasHardware = await LocalAuthentication.hasHardwareAsync()

        if(!hasHardware) {
            Alert.alert("biometric authentication not supported!!")
            return;
        }

        const res = await LocalAuthentication.authenticateAsync()
        console.log(res)
        if(res.success) {
            setUnlocked(res.success)
        }
    }
    
    return (
        <BiometricsCtx.Provider value={{isUnlocked: unlocked, authenticate}}>
            {children}
        </BiometricsCtx.Provider>
    )
}

export default BiometricProvider

export const useBiometrics = () => {
    return useContext(BiometricsCtx)
}