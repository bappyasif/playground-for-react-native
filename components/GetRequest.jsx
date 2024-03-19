import { View, Text, StyleSheet, FlatList, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function GetRequest({ postList, setPostList, setError }) {
    // const [postList, setPostList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    // const [error, setError] = useState("")

    // const fetchData = async (limit = 10) => {
    //     const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)

    //     const data = await response.json()
    //     setPostList(data)

    //     setIsLoading(false)
    // }

    const fetchData = async (limit = 10) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)

            const data = await response.json()
            setPostList(data)

            setIsLoading(false)

            setError("")
        } catch (error) {
            console.error("Fetch failed....", error)
            setError("Failed to fetch post list data!!")
            setTimeout(() => setError(""), 4000)
        }
    }

    const handleRefresh = () => {
        setRefreshing(true)
        fetchData(20)
        setRefreshing(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} color={"lightblue"} />
                <Text>Loading....</Text>
            </SafeAreaView>
        )
    }
    return (
        <View style={styles.list}>
            <FlatList
                data={postList}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <Text style={styles.bodyText}>{item.body}</Text>
                        </View>
                    )
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 15 }} />
                    )
                }}
                ListEmptyComponent={<Text>No posts are found!!</Text>}
                ListHeaderComponent={<Text style={styles.headerText}>Posts List</Text>}
                ListFooterComponent={<Text style={styles.footerText}>Reached end of list!!</Text>}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingHorizontal: 15
    },
    card: {
        backgroundColor: "floralwhite",
        padding: 15,
        borderRadius: 8,
        borderWidth: 1.3
    },
    titleText: {
        fontSize: 31
    },
    bodyText: {
        fontSize: 24,
        color: "#666666"
    },
    headerText: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 12
    },
    footerText: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 12
    },
    loadingContainer: {
        flex: 1,
        // backgroundColor: "seagreen",
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center"
    }
})