import { Slot } from "expo-router";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';

function ProtectedLayout() {
    console.warn("PROTECTED!!")

    return (
        <Slot />
    )
}

export default withAuthenticator(ProtectedLayout)