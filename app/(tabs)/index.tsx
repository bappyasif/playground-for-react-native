import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from "@/assets/data/airbnb-listings.json"

const IndexPage = () => {
  const [category, setCategory] = useState("Tiny homes")

  // memoizing data so that it gives us some performance boost by not loading on each render as dataset is static
  const items = useMemo(() => listingsData as any, [])

  const onCategoryChanged = (name: string) => {
    console.log(name, "changed!!")
    setCategory(name)
  }
  return (
    <View style={{flex: 1, marginTop: 159}}>

      <Stack.Screen 
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />
        }}
      />

      <Listings category={category} data={items} />

      {/* <Link href={"/(modals)/login"}>
        Login
      </Link>
      <Link href={"/(modals)/bookings"}>
        Bookings
      </Link>
      <Link href={"/listing/1234"}>
        Listing details
      </Link> */}
    </View>
  )
}

export default IndexPage