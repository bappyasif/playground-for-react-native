import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import TextInputVariants from "./components/TextInputVariants";
import SwitchUsecase from "./components/SwitchUsecase";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SwitchUsecase />
      <TextInputVariants />
      {/* <SwitchUsecase /> */}
      <LoginForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#d1f1f1",
    paddingTop: StatusBar.currentHeight // only android devices will be affected by this
  }
});