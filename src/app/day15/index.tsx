import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day15 - Todo app

an extensive todo application
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 15: ToDo App` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day15/todo"} asChild>
                <Button title='TODO App' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen