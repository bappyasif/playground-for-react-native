import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

export default function PostRequest({ addToList, setError }) {
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")
    const [isPosting, setIsPosting] = useState(false)

    const addPost = async () => {
        try {
            setIsPosting(true)
            const response = await fetch(
                // "https://jsonplaceholder1.typicode.com/posts"
                "https://jsonplaceholder.typicode.com/posts"
                , {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: postTitle,
                        body: postBody
                    })
                })

            const newPost = await response.json()
            addToList(newPost)
            setIsPosting(false)
            
            setPostBody("")
            setPostTitle("")

            setError("")
        } catch (error) {
            console.error("post request has failed....", error)
            setError("Failed to add this new post!!")
        }
    }

    return (
        <View>
            <Text>PostRequest</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={postTitle}
                    placeholder='Post title'
                    onChangeText={setPostTitle}
                    style={styles.input}
                />
                <TextInput
                    value={postBody}
                    placeholder='Post body'
                    onChangeText={setPostBody}
                    style={styles.input}
                />
                <Button
                    title={isPosting ? "Adding..." : "Add Post"}
                    onPress={addPost}
                    disabled={isPosting}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "floralwhite",
        padding: 15,
        borderRadius: 8,
        borderWidth: 1.3,
        margin: 15
    },
    input: {
        height: 40,
        borderColor: "lightgray",
        borderWidth: 1.1,
        marginBottom: 8,
        padding: 8,
        borderRadius: 8
    }
})