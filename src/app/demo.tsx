import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const DemoScreen = () => {
  return (
    <View>
      <Text>DemoScreen</Text>

      <Link href={"/"}>Home Screen</Link>
    </View>
  )
}

export default DemoScreen