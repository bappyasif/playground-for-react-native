import { useAuthenticator } from "@aws-amplify/ui-react-native"
import { Redirect, Slot } from "expo-router"

export default function AuthLayout () {
    const {authStatus} = useAuthenticator(ctx => [ctx.authStatus])
    // console.log(authStatus)
    
    if(authStatus === "authenticated") {
        return (
            <Redirect href={"/day9/protected"} />
        )
    }

    return (
        <Slot />
    )
}