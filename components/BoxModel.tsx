import { View, Text, StyleSheet } from 'react-native'

export default function BoxModel() {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Box model</Text>
            <View
                style={[styles.lightblueBg, styles.box]}
            >
                <Text 
                    // border radius wont be shown in ios for Text cmponent, but only in androids
                    style={{ backgroundColor: "red", borderRadius: 6 }}
                >Light blue</Text>
            </View>
            <View
                style={[styles.box, styles.lightgreenBg, {borderRadius: 5}]}
            >
                <Text>Light green</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "lightseagreen", padding: 20 },
    title: { fontSize: 20 },
    box: { width: "29%", height: "40%", paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "pink", marginVertical: 8, borderWidth: 4, borderColor: "purple" },
    lightblueBg: { backgroundColor: "lightblue" },
    lightgreenBg: { backgroundColor: "lightgreen" }
})