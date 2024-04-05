import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { DetailsPage } from '~/components/DetailsPage'
import { MediaType } from '~/interfaces/apiresults'

const MoviePage = () => {
    const { id } = useLocalSearchParams<{id: string}>()
    console.log("🚀 ~ MoviePage ~  id :",  id )
    
    return (
        <DetailsPage id={id} mediaType={MediaType.Movie} />
        // <View>
        //     <Text>MoviePage - {id}</Text>
        // </View>
    )
}

export default MoviePage

const styles = StyleSheet.create({})