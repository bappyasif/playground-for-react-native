import React from 'react'
import { Stack } from 'expo-router'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { useTheme } from 'tamagui'

export const unstable_settings = {
  initialRouteName: "index"
}

const Layout = () => {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue11.get()
        },
        headerTintColor: "#fff"
      }}
    >
      <Stack.Screen
        name=' index'
        options={{
          title: "My Favourites",
          headerLeft: () => <DrawerToggleButton tintColor='#fff' />
        }}
      />

      <Stack.Screen
        name='/movie/[id]'
        options={{
          title: "Movie ID",
          headerBackTitle: "Back"
        }}
      />

      <Stack.Screen
        name='tv/[id]'
        options={{
          title: "TV Series ID",
          headerBackTitle: "Back"
        }}
      />
    </Stack>
  )
}

export default Layout