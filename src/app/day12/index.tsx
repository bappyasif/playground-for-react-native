import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day12 - Video feed

Video feed similar to Tiktok, IG reels, Youtube shorts
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 12: Video Feeds` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day12/feed"} asChild>
                <Button title='Video Feed' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen