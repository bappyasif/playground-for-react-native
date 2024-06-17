import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day9 - Authentication

using aws amplify v6
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 9: Authentication Flow` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day9/protected"} asChild>
                <Button title='Authenticate' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen