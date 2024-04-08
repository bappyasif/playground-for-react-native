import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const ProductDetailsPage = () => {
    const {id} = useLocalSearchParams<{id: string}>()
  return (
    <View>
      {/* // way-02: adding custom header to our route */}
      {/* instead of doing it from _layout page we could firect assing header title from page jsx by using Stack.Screen */}
      <Stack.Screen options={{title: "Product Details: " + id}} />
      <Text style={{color: "red", fontSize: 20}}>ProductDetailsPage - {id}</Text>
    </View>
  )
}

export default ProductDetailsPage