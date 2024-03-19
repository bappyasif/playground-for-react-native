import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function TextInputVariants() {
    const [text, setText] = useState()

    return (
        <View>
            <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="email@example.com"
                // secureTextEntry
                keyboardAppearance="default"
                keyboardType="email-address"
                // by default caputalize is enabled, so is auto correct
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput style={[styles.input, styles.multilineText]} placeholder="message.." multiline />
            <Text style={styles.text}>Greetings, {text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 13,
        padding: 9,
        borderWidth: 1.5
    },
    text: {
        fontSize: 31,
        padding: 11
    },
    multilineText: {
        minHeight: 100,
        textAlignVertical: "top" // so that both ios and android devices text alignment remains same
    }
});