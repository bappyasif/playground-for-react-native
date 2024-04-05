import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from "expo-router/drawer"
import { colorTokens } from '@tamagui/themes'
import { Ionicons } from '@expo/vector-icons'

const Layout = () => {
    return (
        <Drawer
            screenOptions={{
                headerShown: true,
                drawerHideStatusBarOnOpen: true,
                drawerActiveBackgroundColor: colorTokens.dark.blue.blue11,
                drawerActiveTintColor: "#fff",
                drawerLabelStyle: { marginLeft: -20 }
            }}
        >
            <Drawer.Screen
                // name="(home)"
                name="home"
                options={{
                    title: "Movie Gallery",
                    headerShown: false,
                    drawerIcon: ({ size, color }) => <Ionicons name='home-sharp' size={size} color={color} />
                }}
            />
            <Drawer.Screen
                // name="(favourites)"
                name="favourites"
                options={{
                    title: "Some Favourites",
                    headerShown: false,
                    drawerIcon: ({ size, color }) => <Ionicons name='star-outline' size={size} color={color} />
                }}
            />
        </Drawer>
    )
}

export default Layout