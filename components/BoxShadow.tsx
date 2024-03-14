import { View, Text, StyleSheet } from 'react-native'

export default function BoxShadowModel() {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Box Shadow</Text>
            <View
                // boxShadow doesnt get applied to anbdroids but only in ios
                style={[styles.lightblueBg, styles.box, styles.boxShadow]}
            >
                <Text 
                    style={{ backgroundColor: "red", borderRadius: 6 }}
                >Light blue</Text>
            </View>
            <View
                style={[styles.box, styles.lightgreenBg, {borderRadius: 5}, styles.androidShadow]}
            >
                <Text>Light green</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "seagreen", padding: 20 },
    title: { fontSize: 20 },
    box: { width: 220, height: 220, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "pink", marginVertical: 8, borderWidth: 4, borderColor: "purple" },
    lightblueBg: { backgroundColor: "lightblue" },
    lightgreenBg: { backgroundColor: "lightgreen" },
    boxShadow: {
        // shadowColor: "#333333",
        shadowColor: "blue",
        shadowOffset: {
            height: 8,
            width: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4
    },
    androidShadow: {
        elevation: 10,
        // only shadowColor is applied both in ios and androids
        shadowColor: "blue"
    }
})