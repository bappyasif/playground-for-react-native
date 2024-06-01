import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day6 - Tinder Swipe

Creating a tinder swipe usecase
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 6: Tinder Swipe` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day6/tinder"} asChild>
                <Button title='Go to Tinder Screen' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen