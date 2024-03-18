import { View, Text, StyleSheet, Platform, Image } from 'react-native'

const getTypeDetails = (type) => {
  switch (type.toLowerCase()) {
    case "electric":
      return { borderColor: "#FFD700", emoji: "⚡️" };
    case "water":
      return { borderColor: "#6493EA", emoji: "💧" };
    case "fire":
      return { borderColor: "#FF5733", emoji: "🔥" };
    case "grass":
      return { borderColor: "#66CC66", emoji: "🌿" };
    default:
      return { borderColor: "#A0A0A0", emoji: "❓" };
  }
};


export default function PokemonCard({ name, image, type, hp, moves, weaknesses }) {
  const { borderColor, emoji } = getTypeDetails(type)

  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.hp}>❤️{hp}</Text>
      </View>

      <Image style={styles.image} source={image} accessibilityLabel={`${name} pokemon`} />

      <View style={styles.typeContainer}>
        <View style={[styles.badge, {borderColor}]}>
          <Text style={styles.typeEmoji}>{emoji}</Text>
          <Text style={styles.typeText}>{type}</Text>
        </View>
      </View>

      <View style={styles.movesContainer}>
        <Text style={styles.movesText}>Moves: {moves.join(", ")}</Text>
      </View>

      <View style={styles.weaknessContainer}>
        <Text style={styles.weaknessText}>Weakness: {weaknesses.join(", ")}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "offwhite",
    borderRadius: 17,
    borderWidth: 2,
    padding: 15,
    margin: 15,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.4,
        shadowRadius: 4
      },
      android: {
        elevation: 6
      }
    })
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 33
  },
  name: {
    fontSize: 31,
    fontWeight: "bold"
  },
  hp: {
    fontSize: 22
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 17,
    resizeMode: "contain"
  },
  typeContainer: {
    alignItems: "center",
    marginBottom: 40
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 20,
    borderWidth: 4
  },
  typeEmoji: {
    fontSize: 31,
    marginRight: 13
  },
  typeText: {
    fontSize: 22,
    fontWeight: "bold"
  },
  movesContainer: {
    marginBottom: 17
  },
  movesText: {
    fontSize: 22,
    fontWeight: "bold"
  },
  weaknessContainer: {
    marginBottom: 8
  },
  weaknessText: {
    fontSize: 22,
    fontWeight: "bold"
  }
})


// export default function PokemonCard({name, image, type, hp, moves, weakness}) {
//   console.log(image, "image!!")
//   return (
//     <View style={styles.card}>
//       <View>
//         <Text>{name}</Text>
//         <Text>{hp}</Text>
//       </View>

//       {/* <Image source={{uri: image}} style={{width: 40, height: 40}} /> */}

//       {/* <Image src={image} /> */}

//       {/* <Image src='../assets/charmender.png' /> */}

//       {/* <Image source={[image]} /> */}

//       {/* <Image source={require(image)} /> */}

//       {/* <Image src={image} source={image} /> */}

//       {/* <Image source={require(`${image}`)} accessibilityLabel={`${name} pokemon`} /> */}

//       {/* <Image source={{uri: image}} accessibilityLabel={`${name} pokemon`} /> */}

//       <Image source={image} accessibilityLabel={`${name} pokemon`} />

//       {/* <Image source={{uri: image}} accessibilityLabel={`${name} pokemon`} style={{width: 90, height: 60}} /> */}

//       <View>
//         <Text>{type}</Text>
//       </View>

//       <View>
//         <Text>Moves: {moves.join(", ")}</Text>
//       </View>

//       <View>
//         <Text>Weakness: {weakness.join(", ")}</Text>
//       </View>
//     </View>
//   )
// }