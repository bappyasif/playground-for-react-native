import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const SignUpWithEmail = async () => {
    setLoading(true)

    const {error} = await supabase.auth.signUp({email, password})

    if(error) Alert.alert(error.message)

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

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

      <Button text={loading ? "Creating account...." : "Create account"} onPress={SignUpWithEmail} disabled={loading} />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
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

export default SignUpScreen;


// import { View, Text, TextInput } from 'react-native'
// import React from 'react'
// import Button from '@/components/Button'
// import { styles } from '../sign-in'
// import { useRouter } from 'expo-router'

// const SignUp = () => {
//     const router = useRouter()
//     return (
//         <View style={styles.container}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput style={styles.input} placeholder='your_email@domain.com' placeholderTextColor={"gainsboro"} />

//             <Text style={styles.label}>Password</Text>
//             <TextInput style={styles.input} placeholder='your password goes here....' placeholderTextColor={"gainsboro"} secureTextEntry={true} />

//             <Button text='Create Account' />
//             {/* <Text style={styles.btnText} onPress={() => router.replace("/(auth)/sign-in")}>Sign in</Text> */}
//             <Text style={styles.btnText} onPress={router.back}>Sign in</Text>
//         </View>
//     )
// }

// export default SignUp