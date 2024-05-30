import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day4 - Animated splash screen

Animated splash screen such as **Netflix** app using **Lottie**
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 4: Animated Splash screen` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day4/animation"} asChild>
                <Button title='View animation' />
            </Link>

            <Link href={"/day4/splash"} asChild>
                <Button title='View animated splash screen' />
            </Link>
        </SafeAreaView>
    )
}

export default DayDetailsScreen