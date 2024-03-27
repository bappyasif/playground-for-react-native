import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ListingsData from "@/assets/data/airbnb-listings.json"
import { Listing } from '@/interfaces/listing'
import Animated, { SlideInDown, SlideInLeft } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const IMG_HEIGHT = 301

const { width } = Dimensions.get("window")

const ListingDetailPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>()

    const listing = (ListingsData as Listing[]).find(item => item.id === id)!

    return (
        <View style={styles.conatiner}>
            <Animated.ScrollView>
                <Animated.Image source={{ uri: listing?.xl_picture_url }} style={styles.image} />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{listing?.name}</Text>
                    <Text style={styles.location}>
                        {listing.room_type} in {listing.smart_location}
                    </Text>
                    <Text style={styles.rooms}>
                        {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
                        {listing.bathrooms} bathrooms
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Ionicons name="star" size={16} />
                        <Text style={styles.ratings}>
                            {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
                        </Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.hostView}>
                        <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
                            <Text>Host since {listing.host_since}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.description}>{listing.description}</Text>
                </View>
            </Animated.ScrollView>
            
            <Animated.ScrollView style={defaultStyles.footer} entering={SlideInDown.delay(209)}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>{listing.price}</Text>
                        <Text>night</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[defaultStyles.btn, {paddingHorizontal: 20}]}>
                        <Text style={defaultStyles.btnText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>

            {/* <Text>ListingDetailPage ---- {id}</Text> */}            
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        height: IMG_HEIGHT,
        width: width
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'mont-sb',
    },
    location: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'mont-sb',
    },
    rooms: {
        fontSize: 16,
        color: Colors.grey,
        marginVertical: 4,
        fontFamily: 'mont-r',
    },
    ratings: {
        fontSize: 16,
        fontFamily: 'mont-sb',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    hostView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    footerText: {
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: 'mont-sb',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.primary,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    header: {
        backgroundColor: '#fff',
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },

    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'mont-r',
    },
});

export default ListingDetailPage