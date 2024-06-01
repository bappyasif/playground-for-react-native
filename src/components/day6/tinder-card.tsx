import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

export const TinderCardWidth = Dimensions.get("screen").width * 0.8

// export const TinderCardHeight = Dimensions.get("screen").height * 1.67

type CardProps = {
    user: {
        name: string,
        image: string
    },
    currIndex: number,
    numOfCards: number,
    activeIndex: SharedValue<number>
}

export default function TinderCard({ user, currIndex, numOfCards, activeIndex }: CardProps) {
    //  range

    const animatedCard = useAnimatedStyle(() => ({
        // opacity: .5
        opacity: interpolate(
            activeIndex.value,
            [currIndex - 1, currIndex, currIndex + 1],
            [1 - 1 / 5, 1, 1]
        ),

        transform: [
            {
                scale: interpolate(
                    activeIndex.value, 
                    [currIndex - 1, currIndex, currIndex + 1],
                    [0.95, 1, 1.1]
                )
            },
            {
                translateY: interpolate(
                    activeIndex.value,
                    [currIndex - 1, currIndex, currIndex + 1],
                    [-27, 0, 0]
                )
            }
        ]
    }))

    return (
        <Animated.View
            style={[
                styles.card,
                animatedCard,
                { 
                    zIndex: numOfCards - currIndex,
                    // opacity: 0.4,
                    // opacity: 1 - currIndex * 0.1, // removing opacioty as we are using animated card styles
                    transform: [
                        // {translateY: -currIndex * 36},
                        // {scale: 1 - currIndex * .1}, // each subseques cards will be 10% smaller than its previous card
                        // {translateY: -currIndex * 60}
                    ] 
                }
            ]}
        >
            <Image style={[StyleSheet.absoluteFillObject, styles.image]} source={{ uri: user.image }} />
            <LinearGradient
                // Background Linear Gradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={[StyleSheet.absoluteFillObject, styles.background]}
            />
            <View style={styles.footer}>
                <Text style={styles.name}>{user.name}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    // card: {
    //     width: TinderCardWidth,
    //     // height: TinderCardWidth * 1.67  // golden ration
    //     aspectRatio: 1 / 1.67, // golden ration

    //     alignItems: "flex-end",
    //     // alignItems: "center",
    //     // marginTop: "auto",

    //     position: "absolute",

    //     borderRadius: 15,
    //     overflow: "hidden",

    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 1
    //     },
    //     shadowOpacity: 0.22,
    //     shadowRadius: 2.22,

    //     elevation: 3
    // },

    card: {
        width: TinderCardWidth,
        // height: tinderCardWidth * 1.67,
        aspectRatio: 1 / 1.67,
        borderRadius: 15,
        justifyContent: 'flex-end',

        position: 'absolute',

        // shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    image: {
        borderRadius: 15
    },
    name: {
        fontSize: 24,
        color: "red",
        fontFamily: "InterBold"
    },
    footer: {
        padding: 10
    },
    background: {
        top: "50%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }
})

/**
 * 
 * 
 export default function TinderCard() {
    return (
        <View style={styles.card}>
            <Image style={[StyleSheet.absoluteFillObject, styles.image]} source={{ uri: "https://picsum.photos/id/64/200/300" }} />
            <LinearGradient
                // Background Linear Gradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={[StyleSheet.absoluteFillObject, styles.background]}
            />
            <View style={styles.footer}>
                <Text style={styles.name}>Dani</Text>
            </View>
        </View>
    )
}
 */