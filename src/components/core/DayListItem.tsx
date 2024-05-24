import { Link } from 'expo-router';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export const DayListItem = ({ day }: { day: number }) => {
    return (
        <Link href={`/${day}`} asChild>
            <Pressable style={styles.box}>
                <Text style={styles.text}>{day}</Text>
            </Pressable>
        </Link>

        // <Link href={"/demo"} asChild>
        //     <Pressable style={styles.box}>
        //         <Text style={styles.text}>{day}</Text>
        //     </Pressable>
        //     {/* view doesnt have any pressable event so we need to use Pressable instead */}
        //     {/* <View style={styles.box}>
        //         <Text style={styles.text}>{day}</Text>
        //     </View> */}
        // </Link>
    )
}


const styles = StyleSheet.create({
    box: {
        backgroundColor: "#f9ede3",
        flex: 1,
        aspectRatio: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 71,
        fontFamily: "AmaticBold",
        //   fontFamily: "Inter",
        //   fontWeight: "bold"
    },
});