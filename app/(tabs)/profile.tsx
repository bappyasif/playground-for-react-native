import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'expo-router'

const ProfilePage = () => {
  const {signOut, isSignedIn} = useAuth()
  return (
    <View>
      <Text>ProfilePage</Text>
      {
        !isSignedIn
        ? <Link href={"/(modals)/login"}>Log in</Link>
        : <Button title='Log Out' onPress={() => signOut()} />
      }
    </View>
  )
}

export default ProfilePage