import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const nums = [...Array(20)].map((v,i) => i + 1)

  return (
    <View style={styles.container}>
      <FlatList 
         data={nums}
         contentContainerStyle={styles.content}
         renderItem={({item}) => (
          <View style={styles.box}>
            <Text style={styles.text}>{item}</Text>
          </View>
         )}
         numColumns={2}
         columnWrapperStyle={styles.column}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  box: {
    backgroundColor: "#f9ede3",
    flex: 1,
    aspectRatio: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    gap: 10,
    padding: 20
  },
  text: {
    fontSize: 40
  },
  column: {
    gap: 10
  },
});
