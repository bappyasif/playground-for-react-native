import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day8 - Weather App

Work with weather data
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 8: Weather App` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day8/weather"} asChild>
                <Button title='Weather data' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen