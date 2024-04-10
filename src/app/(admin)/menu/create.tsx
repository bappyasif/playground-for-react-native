import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button';
import { defaultPicture } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState("")
  const [image, setImage] = useState<string | null>(null);

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

  const onCreate = () => {
    if(!validateInput()) {
      return;
    }

    console.warn("create product!!", name, price)

    resetFields()
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

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: "Create Product"}} />
      <Image source={{uri: image || defaultPicture}} style={styles.image} />
      <Text style={styles.textBtn} onPress={pickImage}>Selcet Image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder='Name....' />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder='9.99' keyboardType='numeric' />
      
      <Text style={{color: "red"}}>{errors}</Text>
      <Button text='Create' onPress={onCreate} />
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