import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function AboutScreen({route}) {
    // using this hook makes more send when using from a nested routes or urility components
    // use navigation hook only when navigation is not accessible or necessary
    const navigation = useNavigation()

    // route is also passed thorugh Stack Screens components
    const {name} = route.params

    return (
        <View style={styles.container}>
          <Text style={styles.text}>AboutScreen</Text>
          <Text>Greetings {name}</Text>
          <Button title='Go to Home Page' onPress={() => navigation.navigate("Home")} />
          <Button title='Go back with data' onPress={() => navigation.navigate("Home", {result: "Resulted Data From About"})} />
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 15
        }
    })