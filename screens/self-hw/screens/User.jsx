import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function User({ route }) {
    // const { uuid, firstname, lastname, username, password, email, website, image } = data
    const { uuid, firstname, lastname, username, password, email, website, image } = route.params.data
    // const {data} = route.params
    // console.log(data, "data!!")
    return (
        <View style={styles.card}>
            {/* <Text>{uuid}</Text> */}
            <Text style={{fontSize: 40, fontWeight: "bold"}}>{firstname} {lastname}</Text>
            <Text>Username: {username}</Text>
            <Text>password: {password}</Text>
            <Text>Email: {email}</Text>
            <Text>Website: {website}</Text>
            <Image style={styles.image} source={{ uri: `https://source.unsplash.com/random/${uuid}` }} alt={image} />

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    image: {
        // flex: 1,
        // flexBasis: 600
        height: 400,
        width: "100%"
    }
})