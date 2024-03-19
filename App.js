import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import GetRequest from "./components/GetRequest";
import PostRequest from "./components/PostRequest";

export default function App() {
  const [error, setError] = useState("")
  const [postList, setPostList] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  // const [refreshing, setRefreshing] = useState(false)

  // const fetchData = async (limit = 10) => {
  //   const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)

  //   const data = await response.json()
  //   setPostList(data)

  //   setIsLoading(false)
  // }

  // const handleRefresh = () => {
  //   setRefreshing(true)
  //   fetchData(20)
  //   setRefreshing(false)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // if(isLoading) {
  //   return(
  //     <SafeAreaView style={styles.loadingContainer}>
  //       <ActivityIndicator size={"large"} color={"lightblue"} />
  //       <Text>Loading....</Text>
  //     </SafeAreaView>
  //   )
  // }

  const addToList = (newItem) => {
    // setPostList(newItem, ...postList)
    // const test = setPostList[]
    setPostList([newItem, ...postList])
    // console.log(newItem)
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        error
          ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) :
          <>
            <PostRequest addToList={addToList} setError={setError} />
            <GetRequest postList={postList} setPostList={setPostList} setError={setError} />
          </>
      }

      {/* <PostRequest addToList={addToList} setError={setError} />
      <GetRequest postList={postList} setPostList={setPostList} setError={setError} /> */}
      {/* <View style={styles.list}>
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
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#d1f1f1",
    paddingTop: StatusBar.currentHeight // only android devices will be affected by this
  },
  errorContainer: {
    backgroundColor: "#FFC0CB",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1.3,
    margin: 15,
    alignItems: "center"
  },
  errorText: {
    color: "#D8000C",
    fontSize: 16,
    textAlign: "center"
  }
  // list: {
  //   flex: 1,
  //   paddingHorizontal: 15
  // },
  // card: {
  //   backgroundColor: "floralwhite",
  //   padding: 15,
  //   borderRadius: 8,
  //   borderWidth: 1.3
  // },
  // titleText: {
  //   fontSize: 31
  // },
  // bodyText: {
  //   fontSize: 24,
  //   color: "#666666"
  // },
  // headerText: {
  //   fontSize: 24,
  //   textAlign: "center",
  //   marginBottom: 12
  // },
  // footerText: {
  //   fontSize: 24,
  //   textAlign: "center",
  //   marginBottom: 12
  // },
  // loadingContainer: {
  //   flex: 1,
  //   // backgroundColor: "seagreen",
  //   paddingTop: StatusBar.currentHeight,
  //   justifyContent: "center",
  //   alignItems: "center"
  // }
});