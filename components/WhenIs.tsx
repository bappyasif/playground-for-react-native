import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
// import { AnimatedTouchableOpacity } from '@/app/(modals)/bookings'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DatePicker from 'react-native-modern-datepicker'
import Colors from '@/constants/Colors'
import { modalDefaultStyles } from '@/constants/Styles'
import { AnimatedTouchableOpacity } from './WhereTo'

// const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const WhenIs = ({openCard, setOpenCard}: {openCard: number, setOpenCard: React.Dispatch<React.SetStateAction<number>>}) => {
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

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 14,
//         margin: 10,
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//         shadowOffset: {
//             width: 2,
//             height: 2,
//         },
//         gap: 20,
//     },
//     previewText: {
//         fontFamily: "mont-sb",
//         fontSize: 15,
//         color: Colors.grey
//     },
//     previewDate: {
//         fontFamily: "mont-sb",
//         fontSize: 15,
//         color: Colors.dark
//     },
//     previewCard: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         padding: 20
//     },
//     cardHeader: {
//         fontFamily: "mont-b",
//         fontSize: 24,
//         padding: 20
//     },
//     cardBody: {
//         paddingHorizontal: 20,
//         // paddingBottom: 20
//     },
// });

export default WhenIs