import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ProductDetailsPage = () => {
    const {id} = useLocalSearchParams<{id: string}>()
  return (
    <View>
      <Text style={{color: "red", fontSize: 20}}>ProductDetailsPage - {id}</Text>
    </View>
  )
}

export default ProductDetailsPage