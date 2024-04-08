import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const MenuLayoutStack = () => {
  return (
    <Stack>
        <Stack.Screen 
            name='index'
            options={{
                // way-01: adding custom header to our route
                title: "Menu"
            }}
        />
    </Stack>
  )
}

export default MenuLayoutStack