import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { modalDefaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedTouchableOpacity } from './WhereTo';

type GroupItemProps = {
    name: string;
    text: string;
    count: number;
}

const WhoIs = ({ openCard, setOpenCard, groups, setGroups }: { openCard: number, setOpenCard: React.Dispatch<React.SetStateAction<number>>, groups: GroupItemProps[], setGroups: any }) => {

    return (
        <View style={modalDefaultStyles.card}>
            {
                openCard !== 2
                    ? (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(2)} style={modalDefaultStyles.previewCard}
                            entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)}
                        >
                            <Text style={modalDefaultStyles.previewText}>Who</Text>
                            <Text style={modalDefaultStyles.previewDate}>Add guests</Text>
                        </AnimatedTouchableOpacity>
                    )
                    : (
                        <>
                            <Animated.Text
                                style={modalDefaultStyles.cardHeader}
                                entering={FadeIn} exiting={FadeOut}
                            >
                                Who's coming?
                            </Animated.Text>
                            <Animated.View style={modalDefaultStyles.cardBody}>
                                {groups?.map((item, idx) => (
                                    <View key={idx} style={[styles.guestItem, idx + 1 < groups.length ? styles.itemBorder : null]}>
                                        <View>
                                            <Text style={{ fontFamily: "mont-sb", fontSize: 13 }}>{item.name}</Text>
                                            <Text style={{ fontFamily: "mont-r", fontSize: 13, color: Colors.grey }}>{item.text}</Text>
                                        </View>

                                        <View style={styles.guestCountContainer}>
                                            <TouchableOpacity onPress={() => {
                                                const newGroups = [...groups];
                                                newGroups[idx].count = newGroups[idx].count > 0 ? newGroups[idx].count - 1 : newGroups[idx].count;
                                                setGroups(newGroups)
                                            }}>
                                                <Ionicons name='remove-circle-outline' size={26} color={groups[idx].count > 0 ? Colors.grey : "#cdcdcd"} />
                                            </TouchableOpacity>

                                            <Text style={styles.countText}>{item.count}</Text>

                                            <TouchableOpacity onPress={() => {
                                                const newGroups = [...groups];
                                                newGroups[idx].count++;
                                                setGroups(newGroups)
                                            }}>
                                                <Ionicons name='add-circle-outline' size={26} color={Colors.grey} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </Animated.View>
                        </>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    guestItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey
    },
    guestCountContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    countText: {
        fontFamily: "mont-r",
        fontSize: 15,
        minWidth: 18,
        textAlign: "center"
    },
});

export default WhoIs