import { View, Text, StyleSheet } from 'react-native'

export default function FlexLayout() {
    return (
        <View>
            {/* by default in react native View is a flex container and items in it a re flext items */}
            <Text style={{ fontSize: 29 }}>Flex Layout Box</Text>
            <View style={styles.container}>
                {/* <BoxComp /> */}
                {/* flex items when uses flex they takes up available spaces among them based on their value given */}
                {/* <BoxComp style={{ backgroundColor: "purple", flex: 1 }}> */}
                <BoxComp style={{ backgroundColor: "purple", alignSelf: "flex-start" }}>
                    {/* <Text style={styles.text}>Box 1</Text> */}
                    Box 1
                </BoxComp>
                {/* <BoxComp style={{ backgroundColor: "magenta", flex: 1 }}> */}
                {/* when alignSlkef is specified its always overwirites whats been specified in container */}
                <BoxComp style={{ backgroundColor: "magenta", alignSelf: "flex-end" }}>
                    Box 2
                </BoxComp>
                {/* <BoxComp style={{ backgroundColor: "maroon", flex: 1 }}> */}
                <BoxComp style={{ backgroundColor: "maroon", alignSelf: "center" }}>
                    Box 3
                </BoxComp>
                <BoxComp style={{ backgroundColor: "cyan", alignSelf: "stretch"}}>
                    Box 4
                </BoxComp>
                {/* alignSelf auto will inherit its container alignSelf value */}
                <BoxComp style={{ backgroundColor: "violet", alignSelf: "auto" }}>
                    Box 5
                </BoxComp>
                {/* when not defined alignSlef is defined as stretched uncless container has its defined then they will get it as their value */}
                <BoxComp style={{ backgroundColor: "blue" }}>
                    Box 6
                </BoxComp>
                <BoxComp style={{ backgroundColor: "green" }}>
                    Box 7
                </BoxComp>
                <BoxComp style={{ backgroundColor: "red" }}>
                    Box 8
                </BoxComp>
            </View>
        </View>
    )
}

// const BoxComp = () => {
//     return (
//         <View style={styles.box}>
//           <Text style={styles.text}>Flex Layout Box</Text>
//         </View>
//       )
// }

const BoxComp = ({ children, style }) => {
    return (
        <View style={[styles.box, style]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { marginTop: 20, borderWidth: 6, borderColor: "darkred", 
    flex: 1, paddingVertical: 11, height: 600, 
    // flexDirection: "column",  
    flexDirection: "row", 
    // justifyContent: "flex-start" 
    // justifyContent: "flex-end" 
    // justifyContent: "center" 
    justifyContent: "space-evenly",
    // alignItems: "flex-start"
    // alignItems: "baseline"
    alignItems: "stretch",
    flexWrap: "wrap-reverse"
},
    box: {
        backgroundColor: "#f1f1f0",
        padding: 11
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    }
})