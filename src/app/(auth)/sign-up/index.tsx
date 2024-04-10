import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import { styles } from '../sign-in'
import { useRouter } from 'expo-router'

const SignUp = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder='your_email@domain.com' placeholderTextColor={"gainsboro"} />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder='your password goes here....' placeholderTextColor={"gainsboro"} secureTextEntry={true} />

            <Button text='Create Account' />
            {/* <Text style={styles.btnText} onPress={() => router.replace("/(auth)/sign-in")}>Sign in</Text> */}
            <Text style={styles.btnText} onPress={router.back}>Sign in</Text>
        </View>
    )
}

export default SignUp