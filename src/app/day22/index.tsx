import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day22 - Local first

Local first app with rn, expo and watermelon db
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 22: Local First` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day22/local"} asChild>
                <Button title='Local First' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen