import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button';
import { defaultPicture } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';

const CreateProductScreen = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState("")
  const [image, setImage] = useState<string | null>(null);
  
  const { id } = useLocalSearchParams<{ id: string }>()
  // const { id } = useLocalSearchParams()

  const idWhenTypeIsNotSpecified = parseFloat(typeof id === "string" ? id : id?.[0])
  
  // const isUpdating = !!id
  const isUpdating = !!idWhenTypeIsNotSpecified

  const {mutate: insertProduct} = useInsertProduct()

  const {mutate: updateProduct} = useUpdateProduct()

  const {data: prodData} = useProduct(idWhenTypeIsNotSpecified)

  const {mutate: deleteProduct} = useDeleteProduct()
  
  const router = useRouter()

  useEffect(() => {
    if(prodData) {
      setName(prodData?.name)
      setImage(prodData.image)
      setPrice(prodData.price.toString())
    }
  }, [prodData])

  const resetFields = () => {
    setName("");
    setPrice("");
  }

  const validateInput = () => {
    setErrors("")

    if(!name) {
      setErrors("Name is required");
      return false
    }
    if(!price) {
      setErrors("Price is required");
      return false
    }
    if(isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false
    }
    return true
  }

  const onSubmit = () => {
    if(isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onCreate = () => {
    if(!validateInput()) {
      return;
    }

    // console.warn("create product!!", name, price)

    // save data into db
    insertProduct({name, price: parseFloat(price), image}, {
      onSuccess: () => {
        resetFields()
        router.back()
      }
    }) 

    // resetFields()
  }

  const onUpdate = () => {
    if(!validateInput()) {
      return;
    }

    // console.warn("updating product!!", name, price)
    updateProduct(
      {id: idWhenTypeIsNotSpecified, name, price: parseFloat(price), image},
      {
        onSuccess: () => {
          resetFields()
          router.back()
        }
      }
    )

    // resetFields()
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    // console.warn("delete", id)
    deleteProduct(
      idWhenTypeIsNotSpecified,
      {
        onSuccess: () => {
          resetFields()
          router.replace("/(admin)")
        }
      }
    )
  }

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure to delete this product?", [
      {
        text: "Cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: isUpdating ? "Updating Product" : "Creating Product"}} />
      <Image source={{uri: image || defaultPicture}} style={styles.image} />
      <Text style={styles.textBtn} onPress={pickImage}>Selcet Image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder='Name....' />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder='9.99' keyboardType='numeric' />
      
      <Text style={{color: "red"}}>{errors}</Text>
      <Button text={isUpdating ? "Update" : 'Create'} onPress={onSubmit} />

      {isUpdating && <Text style={styles.textBtn} onPress={confirmDelete}>Delete</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "floralwhite"
  },
  label: {
    color: "gray",
    fontSize: 16
  },
  input: {
    backgroundColor: "ghostwhite",
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 20
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center"
  },
  textBtn: {
    fontWeight: "bold",
    color: Colors.light.tint,
    alignSelf: "center",
    marginVertical: 10
  }
});

export default CreateProductScreen