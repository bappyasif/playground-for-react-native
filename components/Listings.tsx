import { View, Text, FlatList, ListRenderItem, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import { Listing } from '@/interfaces/listing'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

interface Props {
    data: any[],
    category: string
}

const Listings = ({ category, data }: Props) => {
    // to mimic data fetching from server bit, we will manually induce some loading time
    const [loading, setLoading] = useState(false)

    // keeping track of listings scrolled too
    const listRef = useRef<FlatList>(null)

    useEffect(() => {
        console.log("reload data", data.length)
        setLoading(true)

        const timer = setTimeout(() => setLoading(false), 600)

        return () => clearTimeout(timer)

    }, [category])

    const renderRow: ListRenderItem<Listing> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>

                {/* <View style={styles.Listing}> */}
                <Animated.View style={styles.Listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image
                        source={{ uri: item.medium_url }}
                        style={styles.image}
                    />

                    <TouchableOpacity style={{ position: "absolute", right: 29, top: 29 }}>
                        <Ionicons
                            name='heart-outline'
                            size={24}
                            color={"#000"}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, fontFamily: "mont-sb" }}>{item.name}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Ionicons name='star' size={15} />
                            <Text style={{ fontFamily: "mont-sb" }}>{item.review_scores_rating / 20}</Text>
                        </View>
                    </View>

                    <Text style={{ fontFamily: "mont-r" }}>{item.room_type}</Text>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Text style={{ fontFamily: "mont-sb" }}>&euro; {item.price}</Text>
                        <Text style={{ fontFamily: "mont-r" }}>night</Text>
                    </View>
                </Animated.View>
                {/* </View> */}
            </TouchableOpacity>
            {/* <Text>{item.name}</Text> */}
        </Link>
    )

    return (
        <View style={defaultStyles.container}>
            <FlatList
                ref={listRef}
                data={loading ? [] : data}
                renderItem={renderRow}
            // renderItem={(({ item }) => (
            //     <Text>{item.name}</Text>
            // ))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Listing: {
        padding: 15,
        gap: 11,
        marginVertical: 15
    },
    image: {
        width: "100%",
        height: 301,
        borderRadius: 11
    }
});

export default Listings