import { FlatList, SafeAreaView, ScrollView, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import list from "./data.json";
import pokemonGroups from "./grouped-data.json"

const CustomHeight = () => {
  return (
    <View style={{ width: 15 }}></View>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={list}
        // data={[]}
        renderItem={({ item }) => {
          return (
            <View key={item.id} style={styles.horizontalCard}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.type}</Text>
            </View>
          )
        }}
        horizontal={true}

        // by default keExtractor returns item.key, failing that item.id, and failing that index, to uniquely identify an item from list
        keyExtractor={(item, index) => item.id.toString()}

        ItemSeparatorComponent={CustomHeight}

        // this particularly useful when fetching data from api and getting an empty list 
        ListEmptyComponent={<Text style={{ fontSize: 35, textAlign: "center", width: "200%" }}>List is Empty</Text>}

      // will be shown as a header element for flatlist component
      // ListHeaderComponent={<Text style={styles.headerText}>Pokemon List</Text>}

      // will be shown as a footer element for flatlist component
      // ListFooterComponent={<Text style={styles.footerText}>End of list</Text>}
      />

      <View style={[styles.scrollView, { marginTop: 0, flexBasis: 300 }]}>
        <SectionList
          sections={pokemonGroups}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                {/* item here refers to data proper ty from dataset and thats why itys iperative that we have it transformed as such */}
                <Text style={styles.cardText}>{item}</Text>
              </View>
            )
          }}
          renderSectionHeader={({section}) => {
            // section referes to entire object of an individual group dataset
            return (
              <Text style={styles.sectionHeaderText}>{section.type}</Text>
            )
          }}

          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}

          SectionSeparatorComponent={() => <View style={{ height: 16 }}></View>}
        />
      </View>

      <View style={[styles.scrollView, { marginTop: 0, flexBasis: 400 }]}>
        <FlatList
          data={list}
          // data={[]}
          renderItem={({ item }) => {
            console.log(item.id)
            return (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardText}>{item.name}</Text>
                <Text style={styles.cardText}>{item.type}</Text>
              </View>
            )
          }}

          // this component is used to add space in top and bottom of any given component except for top and bottom of any list
          // so we can get rid of margibBottom from card styles
          ItemSeparatorComponent={<View style={{ height: 16 }}></View>}

          ListEmptyComponent={<Text style={{ fontSize: 35, textAlign: "center" }}>List is Empty</Text>}

          ListHeaderComponent={<Text style={styles.headerText}>Pokemon List</Text>}

          ListFooterComponent={<Text style={styles.footerText}>End of list</Text>}
        />
      </View>

      {/* flatlist in advance only as much data to ensure smooth scrolling */}
      {/* if dataset is less than 50 or so items it performant areas wont be applicable */}
      {/* <FlatList style={styles.scrollView} data={list} renderItem={({ item }) => {
        console.log(item.id)
        return (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.type}</Text>
          </View>
        )
      }} /> */}

      {/* though it works fine but not recommended for list rendering */}
      {/* as only a few will be shown at first upon rendering list but all of it will be rendered before hand making it performance hindering */}
      {/* alternative is to use FlatList */}
      {/* <ScrollView style={styles.scrollView}>
        {
          list.map((pokemon) => {
            console.log(pokemon.id) // all of elements will be shown in order
            return (
              <View key={pokemon.id} style={styles.card}>
                <Text style={styles.cardText}>{pokemon.name}</Text>
                <Text style={styles.cardText}>{pokemon.type}</Text>
              </View>
            )
          })
        }
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#d1f1f1",
    paddingTop: StatusBar.currentHeight // only android devices will be affected by this
  },
  scrollView: {
    paddingHorizontal: 16
  },
  card: {
    backgroundColor: "#D1F1E1",
    padding: 17,
    borderRadius: 8,
    borderWidth: 1,
    // marginBottom: 16
  },
  horizontalCard: {
    flex: 1,
    justifyContent: "center",
    height: "80%",
    width: 290,
    backgroundColor: "#D1F1E1",
    padding: 17,
    borderRadius: 8,
    borderWidth: 1,
    margin: 4,
    alignItems: "center",
  },
  cardText: {
    fontSize: 31
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 12
  },
  sectionHeaderText: {
    backgroundColor: "floralwhite",
    fontSize: 24,
    fontWeight: "bold"
  }
});