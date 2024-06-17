import { Redirect, Slot } from "expo-router";
import { AuthUser, getCurrentUser, GetCurrentUserOutput } from 'aws-amplify/auth';
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

export default function Day9Layout() {
    // const [user, setUser] = useState<AuthUser>()

    // const fetchUser = async () => {
    //     //     const { userId }: GetCurrentUserOutput = await getCurrentUser();
    //     // console.log(userId, "userID!!")
    //     // setUser(userId)
    //     const res = await getCurrentUser();
    //     console.log(res, "userID!!")
    //     setUser(res)
    // }

    // useEffect(() => {
    //     fetchUser()
    // }, [])

    // const {authStatus} = useAuthenticator()
    // console.log(authStatus)
    
    // if(authStatus === "unauthenticated") {
    //     return (
    //         <Redirect href={"/day9/auth/sign-in"} />
    //     )
    // }

    return (
        <Slot />
    )
}