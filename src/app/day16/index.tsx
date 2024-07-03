import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day16 - Todo app with react context

an extensive todo application with react context
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 16: ToDo App` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day16/todo"} asChild>
                <Button title='TODO App' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen