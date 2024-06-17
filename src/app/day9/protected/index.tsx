import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  useAuthenticator
} from '@aws-amplify/ui-react-native';

const Authenticate = () => {
  const {signOut} = useAuthenticator()
  return (
    <View style={{padding: 10}}>
      <Text style={{fontFamily: "InterBold", fontSize: 31}}>Authentication required</Text>
      <Text style={{fontFamily: "Inter", fontSize: 20}}>Ony visible to Authenticated users</Text>

      <Button title='Sign out' onPress={signOut} />
    </View>
  )
}

export default Authenticate

const styles = StyleSheet.create({})