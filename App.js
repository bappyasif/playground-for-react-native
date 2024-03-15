import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "./components/CustomButton";
// import CustomButtonIOS from "./components/CustomButton.ios";
// import CustomButtonAndroid from "./components/CustomButton.android";

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>Welcome!</Text>
          {/* <CustomButtonIOS onPress={() => Alert.alert("Ios button is pressed!!")} title={"Press Me"} />
          <CustomButtonAndroid onPress={() => Alert.alert("Android button is pressed!!")} title={"Press Me"} /> */}

          {/* based on os signature react native will render component accordingly */}

          {/* for more is platform based rendering using Platform Extension is recommended where you will have defined os based components and during runtime react native will decide which components to render */}
          <CustomButton onPress={() => Alert.alert("Ios button is pressed!!")} title={"Press Me"} />
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