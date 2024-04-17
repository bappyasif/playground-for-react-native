import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { defaultPicture } from './ProductListItem';
import { OrderItem, Tables } from '@/types';
import Colors from '@/constants/Colors';

type OrderItemListItemProps = {
  // item: OrderItem;
  item: {products: Tables<"products">} & Tables<"order_items">;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.products.image || defaultPicture }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.products.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default OrderItemListItem;

// import { View, Text, Image, StyleSheet } from 'react-native'
// import React from 'react'
// import { OrderItem } from '@/types'
// import Colors from '@/constants/Colors'

// const OrderItemListItem = ({ ...data }: OrderItem) => {
//     const { id, order_id, product_id, products, quantity, size } = data

//     return (
//         <View style={styles.container}>
//             {/* <Text>OrderItemListItem - {id} - {order_id} - {product_id} - {size} - {quantity}-{products.id}</Text> */}
//             <View style={styles.innerContainer}>
//                 <Image source={{ uri: products.image! }} style={styles.image} />

//                 <View style={styles.wrapper}>
//                     <Text style={{ fontWeight: "bold", fontSize: 18 }}>{products.name}</Text>

//                     <View style={styles.innerContainer}>
//                         <Text style={{ fontWeight: "bold", fontSize: 18, color: Colors.light.tint }}>${products.price}</Text>
//                         <Text style={{ fontWeight: "600", fontSize: 18 }}>Size: {size}</Text>
//                     </View>
//                 </View>
//             </View>

//             <Text style={{ fontWeight: "bold", fontSize: 20 }}>{quantity}</Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         padding: 10,
//         gap: 10,
//         borderRadius: 10,
//         marginBottom: 10,
//         backgroundColor: Colors.light.background,
//         alignItems: "center"
//     },
//     innerContainer: {
//         flexDirection: "row",
//         gap: 6,
//         alignItems: "center"
//     },
//     wrapper: {
//         // flexDirection: "row",
//         gap: 6,
//     },
//     image: {
//         width: 90,
//         height: 90,
//     }
// });

// export default OrderItemListItem