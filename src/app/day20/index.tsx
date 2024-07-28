import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day20 - ChatGPT Wrapper

CHATGPT wrapper with expo router v3 api routes
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 20: ChatGPT` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day20/chatgpt"} asChild>
                <Button title='ChatGpt Wrapper' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen