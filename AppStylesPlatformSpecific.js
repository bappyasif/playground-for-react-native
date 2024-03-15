import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>Welcome!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "plum",
  },
  container: {
    flex: 1,
    backgroundColor: "plum",
    paddingTop: Platform.OS === "android" ? 26 : 0
  },
  box: {
    padding: 20
  },
  text: {
    ...Platform.select({
      ios: {
        color: "purple",
        fontSize: 29,
        fontStyle: "italic"
      },
      android: {
        color: "blue",
        fontSize: 24
      },
    }),
    fontWeight: "bold",
    textAlign: "center"
  }
});