import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { DetailsPage } from '~/components/DetailsPage'
import { MediaType } from '~/interfaces/apiresults'

const MoviePage = () => {
    const { id } = useLocalSearchParams()
    console.log("🚀 ~ TVPage ~  id :",  id )
    
    return (
        <DetailsPage id={id as string} mediaType={MediaType.TV} />
    )
}

export default MoviePage

const styles = StyleSheet.create({})