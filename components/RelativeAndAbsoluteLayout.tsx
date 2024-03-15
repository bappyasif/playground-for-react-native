import { View, Text, StyleSheet } from 'react-native'

export default function RelativeAndAbsoluteLayout() {
    return (
        <View>
            <Text style={{ fontSize: 29 }}>A Flex Grow Usecase</Text>
            <View style={styles.container}>
                <BoxComp style={{ backgroundColor: "red", left: 40, top: 40 }}>
                    Box 1
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue"}}>
                    Box 2
                </BoxComp>
                <BoxComp style={{ backgroundColor: "red" }}>
                    Box 3
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue", left: 40, top: 40}}>
                    Box 4
                </BoxComp>
                <BoxComp style={{ backgroundColor: "red" }}>
                    Box 5
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue", position: "absolute", left: 80, top: 60}}>
                    Box 6
                </BoxComp>
                <BoxComp style={{ backgroundColor: "red" }}>
                    Box 7
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue"}}>
                    Box 8
                </BoxComp>
            </View>
        </View>
    )
}

const BoxComp = ({ children, style }) => {
    return (
        <View style={[styles.box, style]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20, borderWidth: 6, borderColor: "darkred",
        // flex: 1, 
        paddingVertical: 11,
        // height: 300,
        flexDirection: "column",
        alignItems: "stretch",
        alignContent: "stretch",
        gap: 10
    },
    box: {
        backgroundColor: "#f1f1f0",
        padding: 6,
        height:110,
        width: 110
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    }
})