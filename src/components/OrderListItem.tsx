import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order, Tables } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  // order: Order;

  // making use of database generated types instead
  order: Tables<"orders">
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;

// import { View, Text, StyleSheet, Pressable } from 'react-native'
// import React from 'react'
// import { Order } from '@/types'
// import Colors from '@/constants/Colors'
// import dayjs from 'dayjs'
// import RelativeTime from "dayjs/plugin/relativeTime"
// import { Link, useSegments } from 'expo-router'

// const OrderListItem = ({ ...data }: Order) => {
//     const { id, created_at, status, total, user_id, order_items } = data
    
//     dayjs.extend(RelativeTime)
//     const dateAndTime = dayjs(created_at).fromNow()

//     const segnments = useSegments()

//     return (
//         <Link 
//             // href={`/(user)/orders/${id}`} 
//             href={`/${segnments[0]}/orders/${id}`} 
//             asChild 
//             style={styles.container}
//         >
//             <Pressable>
//                 <View style={styles.leftView}>
//                     <Text style={{ fontWeight: "bold", fontSize: 20 }}>Order #{id}</Text>
//                     <Text style={{ fontWeight: "400", fontSize: 18, color: Colors.light.tabIconDefault }}>{dateAndTime}</Text>
//                 </View>

//                 <View>
//                     <Text style={{ fontWeight: "bold", fontSize: 15 }}>{status}</Text>
//                 </View>
//             </Pressable>
//         </Link>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         gap: 10,
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 10,
//         flexDirection: "row",
//         backgroundColor: Colors.light.background,
//         borderRadius: 10
//     },
//     leftView: {
//         gap: 4
//     },
// });

// export default OrderListItem