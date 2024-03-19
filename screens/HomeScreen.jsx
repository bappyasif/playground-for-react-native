import { View, Text, StyleSheet, Button } from 'react-native'

export default function HomeScreen({navigation, route}) {
    // we dont any addintion imports to use default navigation props when used from screen components
    // use navigiation props for all screen components

    const {name, result} = route.params
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      {/* <Button title='Go to About Page' onPress={() => navigation.navigate("About")} /> */}

      <Text>Greetings {name}</Text>

      <Text>{result}</Text>

      <Button title='Update name' onPress={() => navigation.setParams({name: "A. B."})} />

      {/* passing data from one screen to another */}
      <Button title='Go to About Page' onPress={() => navigation.navigate("About", {name: "A B"})} />
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