import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Message = ({ message }: {
    message: {
        role: string;
        content: string;
    }
}) => {
    return (
        <View style={[
            styles.message,
            {
                marginLeft: message.role === "user" ? "auto" : 0, backgroundColor: message.role === "user" ? "#2a87ff" : "#dce7ff"
            }
        ]}>
            <Text style={[
                styles.messageText,
                { color: message.role === "user" ? "floralwhite" : "black" }
            ]}
            >
                {message.content}
            </Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    message: {
        backgroundColor: "gainsboro",
        padding: 10,
        borderRadius: 10,
        width: '90%'
    },
    messageText: {
    }
})