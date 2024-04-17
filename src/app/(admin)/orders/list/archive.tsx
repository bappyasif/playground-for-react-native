import { ActivityIndicator, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';

export default function OrdersScreenForArchives() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: true })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch data</Text>
  }

  return (
    <>
      {/* <Stack.Screen options={{ title: 'Orders' }} /> */}
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}

// import { View, Text, FlatList } from 'react-native'
// import React from 'react'
// import orders from '@assets/data/orders'
// import OrderListItem from '@/components/OrderListItem'

// const OrdersListScreen = () => {
//     return (
//         <View>
//             <FlatList
//                 data={orders}
//                 renderItem={({ item }) => <OrderListItem {...item} />}
//                 numColumns={1}
//                 contentContainerStyle={{
//                     gap: 10,
//                     padding: 10,
//                     // backgroundColor: "white"
//                 }}
//             // columnWrapperStyle
//             />
//         </View>
//     )
// }

// export default OrdersListScreen