import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day10 - Biometrics

Using biometrics to unlock next screen
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen options={{ title: `Day 10: Biometrics Usage` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day10/protected"} asChild>
                <Button title='Biometrically Locked' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen