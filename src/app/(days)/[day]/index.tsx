import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Link, Stack, usePathname } from 'expo-router'

const DayDetailsScreen = () => {
    const pathname = usePathname()
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: `Day Details For ${pathname.split("/")[1]}` }} />
            <Text style={{fontFamily: "Amatic", fontSize: 99}}>DayDetailsScreen</Text>

            <Link href={"/"}>Home Screen</Link>

            <Link href={"/onboarding"} asChild>
                <Button title='Onboarding' />
            </Link>
        </SafeAreaView>
    )
}

export default DayDetailsScreen