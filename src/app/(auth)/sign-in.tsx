import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const SignInWithEmail = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) Alert.alert(error.message)

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button text={loading ? "Signing in...." : "Sign in"} onPress={SignInWithEmail} disabled={loading} />
      <Link href="/(auth)/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;


// import { View, Text, StyleSheet, TextInput } from 'react-native'
// import React from 'react'
// import Button from '@/components/Button';
// import Colors from '@/constants/Colors';
// import { useRouter } from 'expo-router';

// const SignInPageScreen = () => {
//   const router = useRouter()
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Email</Text>
//       <TextInput style={styles.input} placeholder='your_email@domain.com' placeholderTextColor={"gainsboro"} />

//       <Text style={styles.label}>Password</Text>
//       <TextInput style={styles.input} placeholder='your password goes here....' placeholderTextColor={"gainsboro"} secureTextEntry={true} />

//       <Button text='Sign in' />
//       <Text style={styles.btnText} onPress={() => router.push("/(auth)/sign-up/")}>Create an account</Text>
//     </View>
//   )
// }

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "gainsboro",
//     padding: 10
//   },
//   label: {
//     color: "gray",
//     fontWeight: "400",
//     fontSize: 18
//   },
//   input: {
//     backgroundColor: Colors.light.background,
//     padding: 16,
//     borderRadius: 6,
//     marginTop: 4,
//     marginBottom: 20
//   },
//   btnText: {
//     color: Colors.light.tint,
//     alignSelf: "center",
//     fontWeight: "bold",
//     marginVertical: 10
//   },
// });

// export default SignInPageScreen