import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OrdersLayout = () => {
  return (
    <Stack>
      {/* as moved index to list folder for nested rtoutes */}
      {/* <Stack.Screen
        name='index'
        options={{
          title: "Orders"
        }}
      /> */}

      <Stack.Screen
        name='list'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default OrdersLayout