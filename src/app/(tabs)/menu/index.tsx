import ProductListItem from "@/components/ProductListItem";
import products from "@assets/data/products";
import { FlatList, View } from "react-native";

const product = products[0]

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{
          padding: 9,
          gap: 9
        }}
        columnWrapperStyle={{gap: 9}}
      />
      {/* <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} /> */}
    </View>
  );
}
