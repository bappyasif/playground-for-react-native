import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { CartContext, useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {
  // const {items} = useContext(CartContext)
  const {items, total} = useCart()

  return (
    <View style={{padding: 10}}>
      <FlatList 
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        contentContainerStyle={{
          gap: 10,
        }}
      />
      <Text style={{color: "red", marginTop: 20, fontSize: 20, fontWeight: "600"}}>Total ${total}</Text>
      <Button text='Checkout' />
      {/* <Text style={{color: "red"}}>CartScreen -- {items?.length}</Text> */}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen