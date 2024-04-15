import { useProductsList } from "@/api/products";
import ProductListItem from "@/components/ProductListItem";
import { supabase } from "@/lib/supabase";
// import products from "@assets/data/products";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

// const product = products[0]

export default function MenuScreen() {
  // using reusable tanstack module
  const {data: products, error, isLoading} = useProductsList()
  
  // using tanstack
  // const {data: products, error, isLoading} = useQuery({
  //   queryKey: ["products"],
  //   queryFn:  async () => {
  //     const {data, error} = await supabase.from("products").select("*");

  //     if(error) {
  //       throw new Error(error.message)
  //     }

  //     return data
  //   }
  // })

  if(isLoading) {
    return <ActivityIndicator />
  }

  if(error) {
    return <Text>Failed to fetch data</Text>
  }
  
  // manual fetching
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     // to read items from supabase we need assign policies to be able to do so, byt default no access is given to data except for root user
  //     const {data, error} = await supabase.from("products").select("*");
  //     console.log(data)
  //   }

  //   fetchProducts()
  // }, [])

  return (
    <View>
      <FlatList
        data={products}
        // data={data}
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
