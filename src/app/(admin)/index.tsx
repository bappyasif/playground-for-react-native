import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

// doing this redirect as we are trying avoid not found error on index page after refresh
const TabIndex = () => {
  return (
    // <Redirect href={"/menu/"} />
    <Redirect href={"/(admin)/menu/"} />
  )
}

export default TabIndex