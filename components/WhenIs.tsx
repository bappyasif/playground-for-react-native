import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DatePicker from 'react-native-modern-datepicker'
import Colors from '@/constants/Colors'
import { modalDefaultStyles } from '@/constants/Styles'
import { AnimatedTouchableOpacity } from './WhereTo'

const WhenIs = ({ openCard, setOpenCard }: { openCard: number, setOpenCard: React.Dispatch<React.SetStateAction<number>> }) => {
    const today = new Date().toISOString().substring(0, 10)
    return (
        <View style={modalDefaultStyles.card}>
            {
                openCard !== 1
                    ? (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(1)} style={modalDefaultStyles.previewCard}
                            entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)}
                        >
                            <Text style={modalDefaultStyles.previewText}>When</Text>
                            <Text style={modalDefaultStyles.previewDate}>Any week</Text>
                        </AnimatedTouchableOpacity>
                    )
                    : (
                        <>
                            <Animated.Text
                                style={modalDefaultStyles.cardHeader}
                                entering={FadeIn} exiting={FadeOut}
                            >
                                When is your trip?
                            </Animated.Text>

                            <Animated.View style={modalDefaultStyles.cardBody}>
                                <DatePicker
                                    current={today}
                                    selected={today}
                                    mode='calendar'
                                    options={{
                                        defaultFont: "mont-r",
                                        headerFont: "mont-sb",
                                        borderColor: "transparent",
                                        mainColor: Colors.primary
                                    }}
                                />
                            </Animated.View>
                        </>
                    )
            }
        </View>
    )
}

export default WhenIs