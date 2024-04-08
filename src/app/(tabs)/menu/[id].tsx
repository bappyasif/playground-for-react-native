import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@assets/data/products'
import { defaultPicture } from '@/components/ProductListItem'
import Button from '@/components/Button'

const sizes = ["S", "M", "L", "XL"]

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState("M")

  const { id } = useLocalSearchParams<{ id: string }>()

  const product = products.find(item => item.id.toString() === id)

  const addToCart = () => {
    console.warn("addtocart")
  }

  if (!product) {
    return <Text>Product is not found!!</Text>
  }

  return (
    <View style={styles.container}>
      {/* // way-02: adding custom header to our route */}
      {/* instead of doing it from _layout page we could firect assing header title from page jsx by using Stack.Screen */}
      {/* <Stack.Screen options={{title: "Product Details: " + id}} /> */}
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPicture }} style={styles.image} />
      {/* <Text style={{ color: "red", fontSize: 20 }}>ProductDetailsPage - {id}</Text> */}

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map(val => (
          <Pressable key={val} style={[styles.sizeView, {backgroundColor: selectedSize === val ? "gainsboro" : "transparent"}]} onPress={() => setSelectedSize(val)}>
            <Text style={[styles.sizeText, {color: selectedSize === val ? "black" : "grey"}]}>{val}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>Price: ${product.price}</Text>

      <Button text='Add to cart' onPress={addToCart} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "floralwhite",
    flex: 1,
    padding: 10
  },
  image: {
    // width: "100%"
    aspectRatio: 1
  },
  price: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "auto"
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10
  },
  sizeView: {
    backgroundColor: "gainsboro",
    width: 49,
    aspectRatio: 1,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "600"
  }
});

export default ProductDetailsPage