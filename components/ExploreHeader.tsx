import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Haptics from "expo-haptics"

const categories = [
    {
        name: 'Tiny homes',
        icon: 'home',
    },
    {
        name: 'Cabins',
        icon: 'house-siding',
    },
    {
        name: 'Trending',
        icon: 'local-fire-department',
    },
    {
        name: 'Play',
        icon: 'videogame-asset',
    },
    {
        name: 'City',
        icon: 'apartment',
    },
    {
        name: 'Beachfront',
        icon: 'beach-access',
    },
    {
        name: 'Countryside',
        icon: 'nature-people',
    },
];

// we will be accepting this method in our component so that when we change our category item selected, corresponding Listings should also changes
interface Props {
    onCategoryChanged: (name: string) => void
}

const ExploreHeader = ({onCategoryChanged}: Props) => {
    // keeping track of scrilled amount so that we promptly scrolled to currently selected itemRef needs to be refocused
    const scrollRef = useRef<ScrollView>(null)

    // to keep track of which touchable button is currently in use and to focus when needed
    // const itemRef = useRef<TouchableOpacity[]>([])
    const itemsRef = useRef<Array<TouchableOpacity | null>>([])
    const [activeIdx, setActiveIdx] = useState(0)

    const onSelectCategory = (idx: number) => {
        const selected = itemsRef.current[idx]

        setActiveIdx(idx)

        selected?.measure(x => {
            // scrollRef.current?.scrollTo({x: x, y: 0})

            // reduced horizontal scrolling by 15 padding
            scrollRef.current?.scrollTo({x: x - 15, y: 0, animated: true})
        })

        // also giving this haptic feeling upon selecting
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

        // updating category currently selected
        onCategoryChanged(categories[idx].name)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    {/* <Link href={"/(modals)/bookings"}>Booking</Link> */}

                    {/* if we want to add some button within Link then we should use asChild attribute */}
                    <Link href={"/(modals)/bookings"} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name='search' size={24} />
                            <View>
                                <Text style={{ fontFamily: "mont-sb" }}>Where to</Text>
                                <Text style={{ fontFamily: "mont-r", color: Colors.grey }}>Anywhere - Any week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name='options-outline' size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        gap: 31,
                        paddingHorizontal: 15
                    }}
                >
                    {categories.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            ref={(el) => itemsRef.current[idx] = el}
                            style={activeIdx === idx ? styles.categoriesActiveBtn : styles.categoriesBtn}
                            onPress={() => onSelectCategory(idx)}
                        >
                            <MaterialIcons name={item.icon as any} size={24} color={activeIdx === idx ? "#000" : Colors.grey} />
                            <Text style={activeIdx === idx ? styles.categoryActiveText : styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexBasis: 150
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 15,
        gap: 11
    },
    filterBtn: {
        padding: 9,
        borderWidth: .98,
        borderColor: Colors.grey,
        borderRadius: 24
    },
    searchBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        borderColor: "#c2c2c2",
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 15,
        borderRadius: 29,

        // to see shadow in action background color needs to be there too!!
        backgroundColor: "#fff",

        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: .13,
        shadowRadius: 8,
        shadowOffset: {
            width: 1, height: 1
        }
    },
    categoryText: {
        fontSize: 15,
        fontFamily: "mont-sb",
        color: Colors.grey
    },
    categoryActiveText: {
        fontSize: 15,
        fontFamily: "mont-sb",
        color: "#000"
    },
    categoriesBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 8
    },
    categoriesActiveBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        paddingBottom: 8
    }
})

export default ExploreHeader