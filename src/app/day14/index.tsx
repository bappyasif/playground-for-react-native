import { SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import MarkdownDisplay from '@/components/day3/markdown-display'

const agenda = `
# day14 - Push Notifictaions

send and recieve push notifications
`

const DayDetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: `Day 14: Notifications` }} />

            <MarkdownDisplay>{agenda}</MarkdownDisplay>

            <Link href={"/day14/notifications"} asChild>
                <Button title='Go to notifications' />
            </Link>

        </SafeAreaView>
    )
}

export default DayDetailsScreen