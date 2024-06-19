import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day11 - Camera app

Take photos and videos with react native vision camera
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 11: Camera App` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day11/camera"} asChild>
                <Button title='Camera App' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen