import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { useTheme } from 'tamagui'

const Layout = () => {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          // backgroundColor: colorTokens.dark.blue.blue11
          backgroundColor: theme.blue11.get()
        },
        headerTintColor: "#fff"
      }}
    >
      <Stack.Screen
        name=' index'
        // name='home'
        options={{
          title: "Movie Gallery",
          headerLeft: () => <DrawerToggleButton tintColor='#fff' />
        }}
      />

      <Stack.Screen
        name='/movie/[id]'
        options={{
          title: "Movie ID",
        }}
      />
    </Stack>
  )
}

export default Layout