import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Authenticate = () => {
  return (
    <View style={{padding: 10}}>
      <Text style={{fontFamily: "InterBold", fontSize: 31}}>Authentication required</Text>
      <Text style={{fontFamily: "Inter", fontSize: 20}}>Ony visible to Authenticated users</Text>
    </View>
  )
}

export default Authenticate

const styles = StyleSheet.create({})