import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day11 - Camera app

take photos and record with react native vision camera
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 11: Camera app` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day11/camera"} asChild>
                <Button title='Camera app' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen