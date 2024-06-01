import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day5 - AirBnb Map

How to work with Map components
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 5: AirBnb Map` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day5/airbnb"} asChild>
                <Button title='Go to AirBnb Map' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen