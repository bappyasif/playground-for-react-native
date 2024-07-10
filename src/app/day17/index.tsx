import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day17 - Todo app with zustand

an extensive todo application with zustand
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 17: ToDo App` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day17/todo"} asChild>
                <Button title='TODO App' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen