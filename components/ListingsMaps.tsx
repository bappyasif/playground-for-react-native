import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Marker } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import { ListingGeo } from '@/interfaces/listing-geo'
import { useRouter } from 'expo-router'
import MapView from 'react-native-map-clustering'

const Initial_Region = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9
}

const ListingsMaps = memo(({ data }: { data: any }) => {
    const router = useRouter()
    // console.log(data?.features?.length)

    const onMarkerSelected = (item: ListingGeo) => {
        // console.log(event)
        router.push(`/listing/${item.properties.id}`)
    }

    // refer to reacrt-native-maps docs
    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    // latitude: geometry.coordinates[0],
                    // longitude: geometry.coordinates[1],
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
            >
                <View style={styles.marker}>
                    <Text style={{ color: "#000", textAlign: "center", fontFamily: "mont-sb" }}>{points}</Text>
                </View>

            </Marker>
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                animationEnabled={false}
                provider='google'
                showsUserLocation
                showsMyLocationButton
                initialRegion={Initial_Region}
                clusterColor='#fff'
                clusterTextColor='#000'
                clusterFontFamily='mont-sb'
                renderCluster={renderCluster}
            >
                {data?.features?.map((item: ListingGeo) => {
                    return (
                        <Marker
                            key={item.properties.id}
                            onPress={() => onMarkerSelected(item)}
                            coordinate={{
                                latitude: Number(item.properties.latitude),
                                longitude: +item.properties.longitude,
                            }}
                        >
                            {/* giving a custom view */}
                            <View style={styles.marker}>
                                <Text style={styles.markerText}>&euro; {item.properties.price}</Text>
                            </View>
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    },
    marker: {
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1.1,
            height: 11
        }
    },
    markerText: {
        fontSize: 15,
        fontFamily: "mont-sb"
    }
});

export default ListingsMaps

// without clustering
// const ListingsMaps = ({data}: {data: any}) => {
//     const router = useRouter()
//     // console.log(data?.features?.length)
//     const onMarkerSelected = (item: ListingGeo) => {
//         // console.log(event)
//         router.push(`/listing/${item.properties.id}`)
//     }
//   return (
//     <View style={defaultStyles.container}>
//       <MapView style={StyleSheet.absoluteFill} provider='google' showsUserLocation showsMyLocationButton 
//         // initialRegion={Initial_Region}
//         >
//         {data?.features?.map((item: ListingGeo) => {
//             return (
//                 <Marker 
//                     key={item.properties.id}
//                     onPress={() => onMarkerSelected(item)}
//                     coordinate={{
//                         latitude: Number(item.properties.latitude),
//                         longitude: +item.properties.longitude
//                     }}
//                 >
//                     {/* giving a custom view */}
//                     <View style={styles.marker}>
//                         <Text style={styles.markerText}>&euro; {item.properties.price}</Text>
//                     </View>
//                 </Marker>
//             )
//         })}
//       </MapView>
//     </View>
//   )
// }