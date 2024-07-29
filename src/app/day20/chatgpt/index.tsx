import { Button, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Message from '@/components/day20/Message'

const ChatGPTWrapperScreen = () => {
    const [messages, setMessages] = useState([
        { role: "system", content: "you're a helpful assitent" },
        { role: "user", content: "hello there dear user" },
        { role: "assistent", content: "hello, how can i help?" }
    ])

    const [prompt, setPrompt] = useState("");

    const handleOnPressed = () => {
        console.log("pressed!!", prompt)

        setMessages(prev => [...prev, { role: "user", content: prompt }])

        setPrompt("")
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            > */}
                <FlatList
                    data={messages}
                    contentContainerStyle={{ gap: 10, padding: 10 }}
                    renderItem={({ item }) => (
                        <Message message={item} />
                    )}
                />
                <View style={styles.footer}>
                    <TextInput placeholder='how can i help you?' style={styles.input} value={prompt} onChangeText={setPrompt} />
                    <Button title='Seek' onPress={handleOnPressed} />
                </View>
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    )
}

export default ChatGPTWrapperScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "gainsboro",
        padding: 10,
        borderRadius: 49,
        flex: 1
    },
    footer: {
        marginTop: "auto",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        padding: 10,
        gap: 4
    },
    message: {
        backgroundColor: "gainsboro",
        padding: 10,
        borderRadius: 10,
        width: '90%'
    },
    messageText: {
    }
})