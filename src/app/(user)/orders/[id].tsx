import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'

const OrderDetailsScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const order = orders.find(item => item.id === Number(id))
    const orderItems = order?.order_items

    const showItems = () => orderItems?.map(item => <OrderItemListItem {...item} key={item.id} />)

    if(!order) {
        return (
            <View>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Order is not found!!</Text>
            </View>
        )
    }

    return (
        <View>
            <Stack.Screen 
                options={{
                    title: `Order #${id}`
                }} 
            />
            <OrderListItem {...order} />
            
            <View 
                // style={{backgroundColor: "white"}}
                style={{marginVertical: 10}}
            >
                {showItems()}
            </View>
            {/* <Text>OrderDetailsScreen - {id}</Text> */}
        </View>
    )
}

export default OrderDetailsScreen