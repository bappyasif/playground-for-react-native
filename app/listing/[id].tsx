import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ListingDetailPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>()

    return (
        <View>
            <Text>ListingDetailPage ---- {id}</Text>
        </View>
    )
}

export default ListingDetailPage