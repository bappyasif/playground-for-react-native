import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { COLORS, SIZES } from '../../../constants'
import { useFetch } from '../../../hook/useFetch'

const Nearbyjobs = () => {
  const {data, error, isLoading} = useFetch("search", {query: "react developers", num_pages: 1})

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoading
          ? <ActivityIndicator size={"large"} color={COLORS.primary} />
          : error
          ? <Text>Something went wrong!!</Text>
          : (
            data?.map(job => (
              <NearbyJobCard />
            ))
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs