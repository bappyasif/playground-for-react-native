import Colors from '@/src/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';
import products from '@/assets/data/products';

const product = products[0]

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
     <Text style={styles.title}>{product.name}</Text>
     <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    padding: 11,
    borderRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: "blue",
    marginVertical: 11
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold"
  },
  image: {
    width: "100%",
    aspectRatio: 1
  }
});
