import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import WhereTo from '@/components/WhereTo'
import WhenIs from '@/components/WhenIs'
import WhoIs from '@/components/WhoIs'

const guestsGroups = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];

const BookingsModalPage = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0)
  const [groups, setGroups] = useState(guestsGroups)

  const onClearAll = () => {
    // setGroups(guestsGroups)
    setSelectedPlace(0)
    setOpenCard(0)
    setGroups([
      {
        name: 'Adults',
        text: 'Ages 13 or above',
        count: 0,
      },
      {
        name: 'Children',
        text: 'Ages 2-12',
        count: 0,
      },
      {
        name: 'Infants',
        text: 'Under 2',
        count: 0,
      },
      {
        name: 'Pets',
        text: 'Pets allowed',
        count: 0,
      },
    ])
  }

  return (
    <BlurView style={styles.container} intensity={60} tint='light'>

      {/* Where */}
      <WhereTo openCard={openCard} setOpenCard={setOpenCard} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />

      {/* When */}
      <WhenIs openCard={openCard} setOpenCard={setOpenCard} />

      {/* Who */}
      <WhoIs groups={groups} openCard={openCard} setGroups={setGroups} setOpenCard={setOpenCard} />

      {/* Footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

          <TouchableOpacity onPress={onClearAll} style={{ justifyContent: "center" }}>
            <Text style={styles.footerClearText}> Clear all</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn, { paddingLeft: 44, paddingRight: 20 }]}>
            <Ionicons name='search-outline' color={"#fff"} size={24} style={defaultStyles.btnIcon} />
            <Text style={defaultStyles.btnText}> Search </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 110 },
  footerClearText: { fontSize: 18, fontFamily: "mont-sb", textDecorationLine: "underline" }
});

export default BookingsModalPage