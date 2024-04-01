import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'
// @ts-ignore
// import DatePicker from "react-native-modern-datepicker"
import WhereTo from '@/components/WhereTo'
import WhenIs from '@/components/WhenIs'
import WhoIs from '@/components/WhoIs'

// animated view component, so that it can be used in our desired view instead
// export const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity) // export and using this within 

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
  const today = new Date().toISOString().substring(0, 10)
  const [groups, setGroups] = useState(guestsGroups)

  const onClearAll = () => {
    setSelectedPlace(0)
    setOpenCard(0)
    setGroups(guestsGroups)
  }

  return (
    <BlurView style={styles.container} intensity={60} tint='light'>

      {/* Where */}
      <WhereTo openCard={openCard} setOpenCard={setOpenCard} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
      {/* <View style={styles.card}>
        {
          openCard !== 0
            ? (
              <AnimatedTouchableOpacity
                onPress={() => setOpenCard(0)} style={styles.previewCard}
                entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)}
              >
                <Text style={styles.previewText}>Where</Text>
                <Text style={styles.previewDate}>I'm flexible</Text>
              </AnimatedTouchableOpacity>
            )
            : (
              <>
                <Animated.Text
                  style={styles.cardHeader}
                  entering={FadeIn} exiting={FadeOut}
                >
                  Where to?
                </Animated.Text>
                <Animated.View style={styles.cardBody}>
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
      </View> */}

      {/* When */}
      <WhenIs openCard={openCard} setOpenCard={setOpenCard} />
      {/* <View style={styles.card}>
        {
          openCard !== 1
            ? (
              <AnimatedTouchableOpacity
                onPress={() => setOpenCard(1)} style={styles.previewCard}
                entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)}
              >
                <Text style={styles.previewText}>When</Text>
                <Text style={styles.previewDate}>Any week</Text>
              </AnimatedTouchableOpacity>
            )
            : (
              <>
                <Animated.Text
                  style={styles.cardHeader}
                  entering={FadeIn} exiting={FadeOut}
                >
                  When is your trip?
                </Animated.Text>

                <Animated.View style={styles.cardBody}>
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
      </View> */}

      {/* Who */}
      <WhoIs groups={groups} openCard={openCard} setGroups={setGroups} setOpenCard={setOpenCard} />
      {/* <View style={styles.card}>
        {
          openCard !== 2
            ? (
              <AnimatedTouchableOpacity
                onPress={() => setOpenCard(2)} style={styles.previewCard}
                entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)}
              >
                <Text style={styles.previewText}>Who</Text>
                <Text style={styles.previewDate}>Add guests</Text>
              </AnimatedTouchableOpacity>
            )
            : (
              <>
                <Animated.Text
                  style={styles.cardHeader}
                  entering={FadeIn} exiting={FadeOut}
                >
                  Who's coming?
                </Animated.Text>
                <Animated.View style={styles.cardBody}>
                  {groups?.map((item, idx) => (
                    <View key={idx} style={[styles.guestItem, idx + 1 < guestsGroups.length ? styles.itemBorder : null]}>
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
      </View> */}

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

  // card: {
  //   backgroundColor: '#fff',
  //   borderRadius: 14,
  //   margin: 10,
  //   elevation: 4,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  //   shadowOffset: {
  //     width: 2,
  //     height: 2,
  //   },
  //   gap: 20,
  // },
  // previewText: {
  //   fontFamily: "mont-sb",
  //   fontSize: 15,
  //   color: Colors.grey
  // },
  // previewDate: {
  //   fontFamily: "mont-sb",
  //   fontSize: 15,
  //   color: Colors.dark
  // },
  // previewCard: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   padding: 20
  // },
  // cardHeader: {
  //   fontFamily: "mont-b",
  //   fontSize: 24,
  //   padding: 20
  // },
  // cardBody: {
  //   paddingHorizontal: 20,
  //   // paddingBottom: 20
  // },
  // searchSection: {
  //   height: 49,
  //   flexDirection: "row",
  //   borderWidth: 1,
  //   borderColor: "#ababab",
  //   borderRadius: 8,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   alignContent: "center",
  //   marginBottom: 4
  // },
  // inputField: {
  //   flex: 1,
  //   padding: 10,
  //   backgroundColor: "#fff"
  // },
  // searchIcon: {
  //   padding: 11
  // },
  // placeSelected: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: 11,
  //   borderWidth: 2,
  //   borderColor: Colors.grey
  // },
  // place: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: 11
  // },
  // guestItem: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingVertical: 15
  // },
  // itemBorder: {
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   borderBottomColor: Colors.grey
  // },
  // scrollContainer: { gap: 22, paddingLeft: 20, marginBottom: 31 },
  // guestCountContainer: { flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" },
  // countText: { fontFamily: "mont-r", fontSize: 15, minWidth: 18, textAlign: "center" },
});

export default BookingsModalPage