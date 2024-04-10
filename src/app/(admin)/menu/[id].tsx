import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products'
import { defaultPicture } from '@/components/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

// const sizes = ["S", "M", "L", "XL"]
const sizes: PizzaSize[] = ["S", "M", "L", "XL"]

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")

  const { id } = useLocalSearchParams<{ id: string }>()

  const product = products.find(item => item.id.toString() === id)

  const { onAddItem } = useCart()

  const router = useRouter()

  const addToCart = () => {
    // console.warn("addtocart")
    // onAddItem(product!, selectedSize)
    if (!product) return
    onAddItem(product, selectedSize)

    router.push("/cart")
  }

  if (!product) {
    return <Text>Product is not found!!</Text>
  }

  return (
    <View style={styles.container}>
      {/* using edit functionality header from */}
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPicture }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: "auto"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default ProductDetailsPage