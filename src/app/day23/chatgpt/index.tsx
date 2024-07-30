import { ActivityIndicator, Button, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Message from '@/components/day23/Message'

const fetchApi = async (endpoint: string, bodyJson) => {
    const result = await fetch(`http://localhost:8081/day23/chatgpt/${endpoint}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        // body: JSON.stringify(messages)
        body: JSON.stringify(bodyJson)
    })

    const resultJson = await result.json()

    return resultJson
}

const ChatGPTWrapperScreen = () => {
    const [messages, setMessages] = useState([
        // { role: "system", content: "you're a helpful assitent" },
        { role: "system", content: "you're a helpful assitent. you are very sarcastic and passive aggressive" }, // this actually makes openai response custom tailored as such persona!!
        { role: "user", content: "hello there dear user" },
        { role: "assistent", content: "hello, how can i help?" }
    ])

    const [prompt, setPrompt] = useState("");

    const [isLoading, setIsLoading] = useState(false)

    const listRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            listRef.current?.scrollToEnd({ animated: true })
        }, 101)

        return () => clearTimeout(timer)
    }, [messages])

    const handleOnPressed = async () => {
        if (isLoading) {
            return
        }

        setIsLoading(true)

        const userMsg = { role: "user", content: prompt }

        // setMessages(prev => [...prev, { role: "user", content: prompt }])
        setMessages(prev => [...prev, userMsg]) // by sending list of messages it will work as a history for openai to trace back give proper response

        setPrompt("")

        // listRef.current?.scrollToEnd({animated: true})

        try {
            const shouldGenerateImage = await useImagePrompt(userMsg)

            if (shouldGenerateImage) {
                await generateImage()
            } else {
                await generateCompletion(userMsg)
            }
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }

    const generateCompletion = async (userMsg: {
        role: string;
        content: string;
    }) => {
        // const result = await fetch(`http://localhost:8081/day23/chatgpt/${endpoint}`, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: "POST",
        //     // body: JSON.stringify(messages)
        //     body: JSON.stringify([...messages, userMsg])
        // })

        const resultJson = await fetchApi("completion", 
            [...messages.filter(m => m.role !== "image"), userMsg])

        const answer = resultJson.choices?.[0]?.message

        answer && setMessages(prev => [...prev, answer])
    }

    const useImagePrompt = async (prompt) => {
        const resultJson = await fetchApi("completion", [
            
            // ...messages, // we dont need entire messages history fior this just only just only a firection toi system to send ys confidence lecvel in 0 to 1
            {
                role: "system",
                content: "you categorize prompts into image generation and completion genration requests. you only response bak with your confidence whether prompt is likely to be for image genartion or not by denoting 0 to 1.0"
            },
            {
                role: "user",
                content: `tell me if prompt that i sent you is a image generation or chat completion by denoting 1 or 0. Prompt is ${prompt}`
            }
        ])

        const answer = resultJson.choices?.[0]?.message;

        if(answer) {
            return Number(answer.content) > .75
        }

        return false
    }

    const generateImage = async () => {
        // const result = await fetch("http://localhost:8081/day20/chatgpt/imagine", {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: "POST",
        //     // body: JSON.stringify(messages)
        //     body: JSON.stringify({ prompt })
        // })

        // const resultJson = await result.json()

        const resultJson = await fetchApi("imagine", { prompt })

        const answer = resultJson?.data?.[0]?.url

        if (answer) {
            const imageMessage = {
                role: "image",
                content: answer
            }

            setMessages(prev => [...prev, imageMessage])
        }

        console.log(resultJson, "resultJson!!")
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            > */}
            <FlatList
                ref={listRef}
                // data={messages}
                data={messages.filter(item => item.role !== "system")}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => (
                    <Message message={item} />
                )}
                ListFooterComponent={() => (
                    <>
                        <Text>Generating....</Text>
                        <ActivityIndicator />
                    </>
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