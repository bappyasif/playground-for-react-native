import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const MenuLayoutStack = () => {
    return (
        <Stack
            screenOptions={{
                // as we would be using it in index screen so lets put it in tha specific stack sreen instead

                // headerRight: () => (
                //     <Link href="/" asChild>
                //         <Pressable>
                //             {({ pressed }) => (
                //                 <FontAwesome
                //                     name="plus-square-o"
                //                     size={20}
                //                     color={Colors.light.tint}
                //                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                //                 />
                //             )}
                //         </Pressable>
                //     </Link>
                // ),
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    // way-01: adding custom header to our route
                    title: "Menu",
                    headerRight: () => (
                        <Link href="/" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="plus-square-o"
                                        size={20}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />

            <Stack.Screen
                name='[id]'
                options={{
                    // way-01: adding custom header to our route
                    title: "Menu",
                    headerRight: () => (
                        <Link href="/" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={20}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
        </Stack>
    )
}

export default MenuLayoutStack