import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'
import { modalDefaultStyles } from '@/constants/Styles'

export const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const WhereTo = ({ openCard, setOpenCard, selectedPlace, setSelectedPlace }: { openCard: number, setOpenCard: React.Dispatch<React.SetStateAction<number>>, selectedPlace: number, setSelectedPlace: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <View style={modalDefaultStyles.card}>
            {
                openCard !== 0
                    ? (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(0)} style={modalDefaultStyles.previewCard}
                            entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)}
                        >
                            <Text style={modalDefaultStyles.previewText}>Where</Text>
                            <Text style={modalDefaultStyles.previewDate}>I'm flexible</Text>
                        </AnimatedTouchableOpacity>
                    )
                    : (
                        <>
                            <Animated.Text
                                style={modalDefaultStyles.cardHeader}
                                entering={FadeIn} exiting={FadeOut}
                            >
                                Where to?
                            </Animated.Text>
                            <Animated.View style={modalDefaultStyles.cardBody}>
                                <View style={styles.searchSection}>
                                    <Ionicons name='search-sharp' size={20} style={styles.searchIcon} />
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder='Search destination'
                                        placeholderTextColor={Colors.grey}
                                    />
                                </View>

                            </Animated.View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                                {places.map((item, idx) => (
                                    <TouchableOpacity key={idx} onPress={() => setSelectedPlace(idx)}>
                                        <Image source={item.img} style={selectedPlace === idx ? styles.placeSelected : styles.place} />
                                        <Text style={[{ paddingTop: 6 }, selectedPlace === idx ? { fontFamily: "mont-sb" } : { fontFamily: "mont-r" }]}>{item.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    searchSection: {
        height: 49,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ababab",
        borderRadius: 8,
        backgroundColor: "#fff",
        alignItems: "center",
        alignContent: "center",
        marginBottom: 4
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    searchIcon: {
        padding: 11
    },
    placeSelected: {
        width: 120,
        height: 120,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: Colors.grey
    },
    place: {
        width: 120,
        height: 120,
        borderRadius: 11
    },
    scrollContainer: {
         gap: 22, 
         paddingLeft: 20, 
         marginBottom: 31 
    },
    // text2: (selected:number, idx:number) => ({
    //     paddingTop: 6,
    //     fontFamily: selected === idx ? "mont-sb" : "mont-r"
    // })
});

export default WhereTo