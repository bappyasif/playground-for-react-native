import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Image, KeyboardAvoidingView, Platform } from 'react-native'

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({})

    const validationForm = () => {
        let errors = {}

        if(!username) errors.username = "Username is required"
        if(!password) errors.password = "Password is required"

        setErrors(errors)

        return Object.keys(errors).length === 0
    }

    const handleSubmit = () => {
        if(validationForm()) {
            console.log("submitted", username, password)
            setErrors({})
            setPassword("")
            setUsername("")
        }
    }

    return (
        // <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}>
            <Text>LoginForm</Text>
            <View style={styles.form}>
                <Image style={styles.image} source={require("../assets/icon.png")} />
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder='enter your user name' value={username} onChangeText={setUsername} />
                {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder='enter your user password' secureTextEntry value={password} onChangeText={setPassword} />
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                <Button title='Login' onPress={handleSubmit} />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 22,
        // backgroundColor: "|"
    },
    form: {
        backgroundColor: "lightskyblue",
        padding: 20,
        borderRadius: 9,
        shadowColor: "darkblue",
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: .26,
        shadowRadius: 4,
        elevation: 5
    },
    label: {
        fontSize: 17,
        marginBottom: 6,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1.1,
        marginBottom: 15,
        padding: 9,
        borderRadius: 5
    },
    image: {
        width: 200,
        height: 200,
        alignItems: "center",
        marginBottom: 40
    },
    errorText: {
        color: "red",
        marginBottom: 10
    }
})