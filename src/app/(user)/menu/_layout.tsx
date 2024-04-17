import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'

const MenuLayoutStack = () => {
    
    return (
        <Stack
            screenOptions={{
                headerRight: () => (
                    <Link href="/cart" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="shopping-cart"
                                    size={20}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
                headerLeft: () => (
                    <Button title='Signout' onPress={async() => await supabase.auth.signOut()} color={"white"} />
                )
            }}
        >
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