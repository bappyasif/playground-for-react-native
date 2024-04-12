import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Order } from '@/types'
import Colors from '@/constants/Colors'
import dayjs from 'dayjs'
import RelativeTime from "dayjs/plugin/relativeTime"
import { Link, useSegments } from 'expo-router'

const OrderListItem = ({ ...data }: Order) => {
    const { id, created_at, status, total, user_id, order_items } = data
    
    dayjs.extend(RelativeTime)
    const dateAndTime = dayjs(created_at).fromNow()

    const segnments = useSegments()

    return (
        <Link 
            // href={`/(user)/orders/${id}`} 
            href={`/${segnments[0]}/orders/${id}`} 
            asChild 
            style={styles.container}
        >
            <Pressable>
                <View style={styles.leftView}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Order #{id}</Text>
                    <Text style={{ fontWeight: "400", fontSize: 18, color: Colors.light.tabIconDefault }}>{dateAndTime}</Text>
                </View>

                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{status}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
        backgroundColor: Colors.light.background,
        borderRadius: 10
    },
    leftView: {
        gap: 4
    },
});

export default OrderListItem