import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdffff"
    },
    inputField: {
        height: 44,
        borderWidth: 1.1,
        borderColor: "#ababab",
        borderRadius: 8,
        padding: 11,
        backgroundColor: "#fff"
    },
    btn: {
        backgroundColor: Colors.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mont-b',
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: Colors.grey,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
})

export const modalDefaultStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    previewText: {
        fontFamily: "mont-sb",
        fontSize: 15,
        color: Colors.grey
    },
    previewDate: {
        fontFamily: "mont-sb",
        fontSize: 15,
        color: Colors.dark
    },
    previewCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    cardHeader: {
        fontFamily: "mont-b",
        fontSize: 24,
        padding: 20
    },
    cardBody: {
        paddingHorizontal: 20,
        // paddingBottom: 20
    },
})