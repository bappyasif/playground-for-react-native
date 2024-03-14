import { View, Text, StyleSheet } from 'react-native'

export default function StylesInheritence() {
    return (
        <View
            style={styles.container}
        >
            <View style={styles.darkMode}>
                {/* to specifically define font color we have to make use of color rule in Text component directly */}
                {/* but inheritence is available in Text sub tress */}
                <Text style={[styles.title, {color: "white"}]}>Styles Inheritence <Text style={styles.fontBold}>in bold!!</Text></Text>
            </View>
            <View
                style={[styles.lightblueBg, styles.box, styles.boxShadow]}
            >
                <Text
                    style={{ backgroundColor: "red", borderRadius: 6 }}
                >Light blue</Text>
            </View>
            <View
                style={[styles.box, styles.lightgreenBg, { borderRadius: 5 }, styles.androidShadow]}
            >
                <Text>Light green</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "lightskyblue", padding: 20 },
    title: { fontSize: 20 },
    // font color is still not applied due to no css inheritence in native react
    darkMode: {backgroundColor: "black", color: "white"},
    fontBold: { fontWeight: "bold"},
    box: { width: 220, height: 220, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "pink", marginVertical: 8, borderWidth: 4, borderColor: "purple" },
    lightblueBg: { backgroundColor: "lightblue" },
    lightgreenBg: { backgroundColor: "lightgreen" },
    boxShadow: {
        shadowColor: "#333333",
        shadowOffset: {
            height: 8,
            width: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4
    },
    androidShadow: {
        elevation: 10,
        shadowColor: "blue"
    }
})