import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import ApartmentListItem from './apartment-list-item'
import apts from "@assets/data/day5/appartments.json"

type PropsTypes = {
    apt: typeof apts[0],
    onPress: () => void
}

export default function CustomMarker({ apt, onPress }: PropsTypes) {
    return (
        <Marker
            coordinate={{ latitude: apt.latitude, longitude: apt.longitude }}
            // we will be using a custom card which will show more relavant info on each maker
            // title={apt.title}
            // description={apt.title}
            onPress={onPress}
        >
            <View style={styles.marker}>
                <Text style={styles.markerText}>$ {apt.price}</Text>
            </View>

            {/* display selected apartment info */}
            {/* <ApartmentListItem /> */}
        </Marker>
    )
}

const styles = StyleSheet.create({
    marker: {
        backgroundColor: "whitesmoke",
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "floralwhite",
        borderRadius: 20
    },
    markerText: {
        fontFamily: "InterBold"
    }
})