import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const OnboardingScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>

        <FontAwesome5 name="people-arrows" size={80} color="#cef202" style={styles.image} />

        <View style={styles.footer}>
          <Text style={styles.title}>Track transactions</Text>
          <Text style={styles.description}>Monitor your spending and contribution, ensuring every penny aligns with your budget.</Text>

          <View style={styles.btnsRow}>
            <Text style={styles.btnTxt}>Skip</Text>

            <Link href={"/onboarding2-multi-screen"} asChild>
              <Pressable style={styles.btn}>
                <Text style={styles.btnTxt}>Continue</Text>
              </Pressable>
            </Link>
            {/* <Pressable style={styles.btn}>
              <Text style={styles.btnTxt}>Skip</Text>
            </Pressable> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141A",
    padding: 20
  },
  content: {
    flex: 1,
    padding: 20,
    // backgroundColor: "red"
  },
  title: {
    color: "#fdfdfd",
    fontSize: 31,
    fontFamily: "InterBold",
    letterSpacing: 4,
    marginVertical: 11
  },
  description: {
    color: "lightgray",
    fontSize: 18,
    fontFamily: "InterReg",
    lineHeight: 29
  },
  image: {
    alignSelf: "center",
    margin: 20
  },
  footer: {
    // margin: "auto",
    marginTop: "auto",
    // backgroundColor: "red",
  },
  btnsRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  },
  btn: {
    backgroundColor: "#302E38",
    // padding: 15,
    borderRadius: 50,
    alignItems: "center",
    flex: 1
  },
  btnTxt: {
    color: "#fdfdfd",
    fontFamily: "InterBold",
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 26
  }
});

export default OnboardingScreen