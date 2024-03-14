import { View, Text, StyleSheet } from 'react-native'

export default function RnStyles() {
  return (
    <View
        // inline-styling
        // style={{flex: 1, backgroundColor: "plum", padding: 20}}
        style={styles.container}
    >
      <Text style={styles.title}>RnStyles</Text>
      <View 
        // style={styles.lightblueBox}
        // style={[styles.box, styles.lightblueBg]}
        style={[styles.lightblueBg, styles.box]} // this will overwrite background color value based on precedence
      >
        <Text>Light blue</Text>
      </View>
      <View 
        // style={styles.lightgreenBox}
        style={[styles.box, styles.lightgreenBg]}
      >
        <Text>Light green</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "plum", padding: 20},
    title: {fontSize: 20},
    // lightblueBox: {backgroundColor: "lightblue", width: 100, height: 96, padding: 10},
    // lightgreenBox: {backgroundColor: "lightgreen", width: 100, height: 96, padding: 10}
    box: {width: 100, height: 96, padding: 10, backgroundColor: "pink"},
    lightblueBg: {backgroundColor: "lightblue"},
    lightgreenBg: {backgroundColor: "lightgreen"}
})