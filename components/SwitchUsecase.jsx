import { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

export default function SwitchUsecase() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <View style={styles.switchContainer}>
            <Text style={styles.text}>Dark Mode Switcher!!</Text>
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(prev => !prev)} trackColor={{ false: "#767775", true: "lightblue" }} thumbColor={"#f4f3f4"} />
        </View>
    )
}

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 11
    },
    text: {
        fontSize: 31,
        padding: 9
    }
})