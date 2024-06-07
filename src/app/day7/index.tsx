import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day7 - Voice Memos

Work with microphone and audio playback
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 7: Voice Memo` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day7/memos"} asChild>
                <Button title='Go to Voice Memos' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen