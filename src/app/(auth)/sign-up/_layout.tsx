import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SignUpLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen 
            name='index'
            options={{
                title: "Sign UP!!"
            }}
        />
    </Stack>
  )
}

export default SignUpLayout