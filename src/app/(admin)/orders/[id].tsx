import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '../../../../assets/data/orders';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { OrderStatusList } from '@/types';
import Colors from '@/constants/Colors';

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      {/* it will keep always visible on screen with flatlist */}
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        // this way header component will move along with list
        // ListHeaderComponent={() => <OrderListItem order={order} />}
        
        // this way footer component will move along with list
        // ListFooterComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => console.warn('Update status')}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;

// import { View, Text } from 'react-native'
// import React from 'react'
// import { Stack, useLocalSearchParams } from 'expo-router'
// import orders from '@assets/data/orders'
// import OrderListItem from '@/components/OrderListItem'
// import OrderItemListItem from '@/components/OrderItemListItem'

// const OrderDetailsScreen = () => {
//     const { id } = useLocalSearchParams<{ id: string }>()
//     const order = orders.find(item => item.id === Number(id))
//     const orderItems = order?.order_items

//     const showItems = () => orderItems?.map(item => <OrderItemListItem {...item} key={item.id} />)

//     if(!order) {
//         return (
//             <View>
//                 <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Order is not found!!</Text>
//             </View>
//         )
//     }

//     return (
//         <View>
//             <Stack.Screen 
//                 options={{
//                     title: `Order #${id}`
//                 }} 
//             />
//             <OrderListItem order={order} />
            
//             <View 
//                 // style={{backgroundColor: "white"}}
//                 style={{marginVertical: 10}}
//             >
//                 {showItems()}
//             </View>
//             {/* <Text>OrderDetailsScreen - {id}</Text> */}
//         </View>
//     )
// }

// export default OrderDetailsScreen