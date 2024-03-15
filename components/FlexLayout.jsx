import { View, Text, StyleSheet } from 'react-native'

export default function FlexLayout() {
    return (
        <>
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
                    <BoxComp style={{ backgroundColor: "cyan", alignSelf: "stretch" }}>
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
                    {/* when using height with flex:1 then height will only to be taken as defined but when used with flexBasis it will take up all possible available space for that item */}
                    <BoxComp style={{ backgroundColor: "green", height: 140, flex: 1 }}>
                        Box 7
                    </BoxComp>
                    {/* flexBasis is used to define flex item height in alternative to defining height for initial height */}
                    <BoxComp style={{ backgroundColor: "red", flexBasis: 130, flex: 1 }}>
                        Box 8
                    </BoxComp>
                </View>
            </View>
            <FlexShrink />
            <FlexGrow />
        </>
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

const FlexShrink = () => {
    return (
        <View>
            <Text style={{ fontSize: 29 }}>A Flex Shrink Usecase</Text>
            <View style={styles.shrinkContainer}>
                {/* flexShrink is always relative to other elements in container */}
                <BoxComp style={{ backgroundColor: "red", flexShrink: 1 }}>
                    Box 1 shrink
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue", flexShrink: 2}}>
                    Box 2 shrink
                </BoxComp>
            </View>
        </View>
    )
}

const FlexGrow = () => {
    return (
        <View>
            <Text style={{ fontSize: 29 }}>A Flex Grow Usecase</Text>
            <View style={styles.growContainer}>
                {/* flex sets to 1 also implicitly sets flexShrink to 1 and flexBasis to 0 */}

                {/* flexGrow is always relative to other elements in container */}
                <BoxComp style={{ backgroundColor: "red", flexGrow: 1 }}>
                    Box 1 grow
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue", flexGrow: 0}}>
                    Box 2 grow
                </BoxComp>
                <BoxComp style={{ backgroundColor: "red", flexGrow: 0 }}>
                    Box 3 grow
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue", flexGrow: 2}}>
                    Box 4 grow
                </BoxComp>
                <BoxComp style={{ backgroundColor: "red", flexGrow: 1 }}>
                    Box 5 grow
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue", flexGrow: 1}}>
                    Box 6 grow
                </BoxComp>
                <BoxComp style={{ backgroundColor: "red", flexGrow: 1 }}>
                    Box 7 grow
                </BoxComp>
                <BoxComp style={{ backgroundColor: "blue", flexGrow: 1}}>
                    Box 8 grow
                </BoxComp>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    growContainer: {
        marginTop: 20, borderWidth: 4, 
        borderColor: "green",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        height: 600
    },
    shrinkContainer: {
        marginTop: 20, borderWidth: 4, 
        borderColor: "pink",
        flex: 1,
        // flexBasis: 130,
        flexDirection: "row",
        // flexWrap: "wrap",
        // height: 110,
        width: 280,
        alignItems: "flex-start"
    },
    container: {
        marginTop: 20, borderWidth: 6, borderColor: "darkred",
        // flex: 1, 
        paddingVertical: 11,
        height: 300,
        flexDirection: "column",
        // flexDirection: "row", 
        // justifyContent: "flex-start" 
        // justifyContent: "flex-end" 
        // justifyContent: "center" 
        justifyContent: "space-evenly",
        // alignItems: "flex-start"
        // alignItems: "baseline"
        alignItems: "stretch",
        // flexWrap: "wrap-reverse"
        flexWrap: "wrap",
        // alignContent: "flex-end"
        // alignContent: "center"
        alignContent: "stretch",
        // alignContent: "space-around"
        // rowGap: 20,
        // columnGap: 30,
        gap: 10
    },
    box: {
        backgroundColor: "#f1f1f0",
        padding: 11,
        // giving flexGrow 1 to all box items will ensure all items are taking equal space among them
        // flexGrow: 1
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    }
})