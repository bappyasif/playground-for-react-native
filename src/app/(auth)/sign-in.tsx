import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

const SignInPageScreen = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder='your_email@domain.com' placeholderTextColor={"gainsboro"} />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder='your password goes here....' placeholderTextColor={"gainsboro"} secureTextEntry={true} />

      <Button text='Sign in' />
      <Text style={styles.btnText} onPress={() => router.push("/(auth)/sign-up/")}>Create an account</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gainsboro",
    padding: 10
  },
  label: {
    color: "gray",
    fontWeight: "400",
    fontSize: 18
  },
  input: {
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 20
  },
  btnText: {
    color: Colors.light.tint,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10
  },
});

export default SignInPageScreen