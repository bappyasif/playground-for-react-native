import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack, usePathname } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const sampleMd = `
# sample header

integrating markdown with **React Native**
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 3: Markdown project` }} />
            <Text style={{fontFamily: "Amatic", fontSize: 99}}>DayDetailsScreen</Text>

            <MarkdownDisplay>{sampleMd}</MarkdownDisplay>

            <Link href={"/"}>Home Screen</Link>

            <Link href={"/day3/markdown-editor"} asChild>
                <Button title='Go to markdown editor' />
            </Link>
        </SafeAreaView>
    )
}

export default DayDetailsScreen