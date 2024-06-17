import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { signIn } from 'aws-amplify/auth'
import { Link, router } from 'expo-router'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSignInPressed = async () => {
        // console.warn("sign in....")
        setError('')

        try {
            const { isSignedIn } = await signIn({ username: email, password })
            console.log(isSignedIn, "!!")
            if (isSignedIn) {
                router.push("/day9/protected")
            }
        } catch (e) {
            console.log(e)
            setError(e.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput value={email} onChangeText={setEmail} placeholder='jon@doe.com' style={styles.input} />
            <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />

            <Button title='Sign-in' onPress={onSignInPressed} />

            {
                error
                    ? <Text style={{ color: "red" }}>{error}</Text>
                    : null
            }

            <Link href={"/day9/auth/sign-up"}>New here? Sign up</Link>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: "center",
        flex: 1
    },
    title: {
        fontFamily: "Inter",
        // fontWeight: "bold"
        fontSize: 29,
        color: "dimgray"
    },
    input: {
        borderWidth: 1,
        borderColor: "gainsboro",
        padding: 10,
        marginVertical: 10,
        backgroundColor: "floralwhite",
        borderRadius: 5
    }
})