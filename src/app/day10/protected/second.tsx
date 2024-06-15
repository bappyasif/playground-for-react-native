import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

const MoreBiometricallyProtectedScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontFamily: "Inter", fontSize: 27, marginBottom: 20 }}>More of Protected info!!</Text>
            <Entypo name="lock" size={80} color="grey" />

            <Link href={"/day10/protected"}>goto base protected page</Link>
        </View>
    )
}

export default MoreBiometricallyProtectedScreen

const styles = StyleSheet.create({})