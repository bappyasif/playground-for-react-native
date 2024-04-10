import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
    return (
        <Stack
            // screenOptions={{
            //     headerShown: false
            // }}
            screenOptions={{
                headerStyle: {
                    // backgroundColor: '#f4511e',
                    backgroundColor: Colors.light.background,
                },
                headerTintColor: Colors.light.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: "lightgray"
                }
                // headerShown: false
            }}
        >
            <Stack.Screen
                name='sign-in'
                options={{
                    title: "Sign In",
                    // headerShown: false
                }}
            />

            <Stack.Screen
                name='sign-up'
                options={{
                    title: "Sign Up",
                    // headerShown: false
                }}
            />
        </Stack>
    )
}

export default AuthLayout