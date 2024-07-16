import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day18 - insta story

making a insta stories view alike app with reanimate
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 17: ToDo App` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day18/insta-stories"} asChild>
                <Button title='Insta Stories' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen