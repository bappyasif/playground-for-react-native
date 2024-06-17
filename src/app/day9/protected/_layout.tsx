import { Redirect, Slot } from "expo-router";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';

function ProtectedLayout() {
    // console.warn("PROTECTED!!")

    const {authStatus} = useAuthenticator(ctx => [ctx.authStatus])
    console.log(authStatus)
    
    if(authStatus === "unauthenticated") {
        return (
            <Redirect href={"/day9/auth/sign-in"} />
        )
    }

    return (
        <Slot />
    )
}

// export default withAuthenticator(ProtectedLayout)

export default ProtectedLayout