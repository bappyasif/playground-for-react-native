import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day23 - ChatGPT Wrapper for Image generation

CHATGPT wrapper with expo router v3 api routes and dalle 
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 20: ChatGPT AI generation` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day23/chatgpt"} asChild>
                <Button title='AI Generation' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen