import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import apts from "@assets/data/day5/appartments.json"

const ApartmentListItem = ({ apt, containerStyle }: { apt: typeof apts[0], containerStyle?: ViewStyle }) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <Image source={{ uri: apt.image }} style={styles.image} />
      <View style={styles.rightWrapper}>
        <Text style={styles.title}>{apt.title}</Text>
        <Text style={styles.description}>Stay at this spacious apartment for this affordable price.</Text>
        <View style={styles.footer}>
          <View style={{flexDirection: "row", gap: 2}}>
            <Text style={styles.price}>$ {apt.price}</Text> 
            <Text style={{fontSize: 13}}>/ Night</Text>
            </View>
          <Text style={styles.ratings}>★{apt.rating} ({apt.numberOfStars})</Text>
        </View>
      </View>
    </View>
  )
}

export default ApartmentListItem

const styles = StyleSheet.create({
  card: {
    backgroundColor: "whitesmoke",
    // position: "absolute",
    // bottom: 40,
    // // padding: 10,
    // left: 10,
    // right: 10,
    flexDirection: "row",
    borderRadius: 20,
    // borderColor: "red",
    // borderWidth: 2,
    overflow: "hidden"
  },
  title: {
    fontFamily: "InterBold",
    marginBottom: 10
  },
  description: {
    color: "grey"
  },
  image: {
    width: 150,
    aspectRatio: 1
  },
  rightWrapper: {
    padding: 10,
    // so that it takes up space only from whats available
    flex: 1
  },
  price: {
    fontFamily: "InterBold"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto"
  },
  ratings: {}
})