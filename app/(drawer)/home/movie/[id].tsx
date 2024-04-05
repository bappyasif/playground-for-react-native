import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const MoviePage = () => {
    const { id } = useLocalSearchParams()
    console.log("🚀 ~ MoviePage ~  id :",  id )
    
    return (
        <View>
            <Text>MoviePage - {id}</Text>
        </View>
    )
}

export default MoviePage

const styles = StyleSheet.create({})