import { View, Text, StyleSheet, Button } from 'react-native'

export default function DashboardScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DashboardScreen</Text>
      <Button title='Toggle Drawer' onPress={() => navigation.toggleDrawer()} />
      <Button title='Settings Page' onPress={() => navigation.jumpTo("Settings")} />
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