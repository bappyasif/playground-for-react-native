import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Share } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import ListingsData from "@/assets/data/airbnb-listings.json"
import { Listing } from '@/interfaces/listing'
import Animated, { SlideInDown, SlideInLeft, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const IMG_HEIGHT = 301

const { width } = Dimensions.get("window")

const ListingDetailPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>()

    const listing = (ListingsData as Listing[]).find(item => item.id === id)!

    const scrollRef = useAnimatedRef<Animated.ScrollView>()

    const navigation = useNavigation()

    const scrollOffset = useScrollViewOffset(scrollRef)

    const shareListing = async () => {
        try {
            await Share.share({
                title: listing.name,
                url: listing.listing_url
            })
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        // this way we are now directly changing Stack.Screen setOptions properties
        navigation.setOptions({
            headerBackground: () => {
                return (
                    <Animated.View
                        // style={[styles.header, headerAnimatedStyle]}
                        style={[headerAnimatedStyle, styles.header]}
                    />
                )
            },
            headerRight: () => {
                return (
                    <View style={styles.bar}>
                        <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
                            <Ionicons name='share-outline' size={22} color={"#000"} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundButton}>
                            <Ionicons name='heart-outline' size={22} color={"#000"} />
                        </TouchableOpacity>
                    </View>
                )
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={24} color={Colors.grey} />
                    </TouchableOpacity>
                )
            }
        })
    }, [])

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.65]
                    )
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
                }
            ]
        }
    })

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            // opacity: 0
            // opacity: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [0, 1])
            opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1])
        }
    })

    return (
        <View style={styles.conatiner}>
            <Animated.ScrollView
                ref={scrollRef}
                contentContainerStyle={{
                    paddingBottom: 101
                }}
                scrollEventThrottle={16}
            >
                <Animated.Image source={{ uri: listing?.xl_picture_url }} style={[styles.image, imageAnimatedStyle]} />

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
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>{listing.price}</Text>
                        <Text>night</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20 }]}>
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
        // backgroundColor: 'red',
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