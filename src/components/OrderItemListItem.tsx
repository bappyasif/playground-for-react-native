import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { OrderItem } from '@/types'
import Colors from '@/constants/Colors'

const OrderItemListItem = ({ ...data }: OrderItem) => {
    const { id, order_id, product_id, products, quantity, size } = data

    return (
        <View style={styles.container}>
            {/* <Text>OrderItemListItem - {id} - {order_id} - {product_id} - {size} - {quantity}-{products.id}</Text> */}
            <View style={styles.innerContainer}>
                <Image source={{ uri: products.image! }} style={styles.image} />

                <View style={styles.wrapper}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{products.name}</Text>

                    <View style={styles.innerContainer}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, color: Colors.light.tint }}>${products.price}</Text>
                        <Text style={{ fontWeight: "600", fontSize: 18 }}>Size: {size}</Text>
                    </View>
                </View>
            </View>

            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{quantity}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        gap: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: Colors.light.background,
        alignItems: "center"
    },
    innerContainer: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center"
    },
    wrapper: {
        // flexDirection: "row",
        gap: 6,
    },
    image: {
        width: 90,
        height: 90,
    }
});

export default OrderItemListItem