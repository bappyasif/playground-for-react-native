import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack, usePathname } from 'expo-router'

const DayDetailsScreen = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: `Day 3: Markdown project` }} />
            <Text style={{fontFamily: "Amatic", fontSize: 99}}>DayDetailsScreen</Text>

            <Link href={"/"}>Home Screen</Link>

            <Link href={"/day3/markdown-editor"} asChild>
                <Button title='Go to markdown editor' />
            </Link>
        </SafeAreaView>
    )
}

export default DayDetailsScreen