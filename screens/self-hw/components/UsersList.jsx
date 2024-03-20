import { View, Text, Image, FlatList, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function UsersList({ data }) {
    // const allUsers = () => data?.map(item => <RenderUser key={item.id} {...item} />)
    return (
        <View>
            <Text>UsersList</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderUser data={item} />}
                keyExtractor={item => item.uuid}
                ListHeaderComponent={<Text>Users List</Text>}
                ListFooterComponent={<Text>End Of Users List</Text>}
                ItemSeparatorComponent={<View style={{ height: 20 }}></View>}
            />
        </View>
    )
}

const RenderUser = ({ data }) => {
    const { uuid, firstname, lastname, username, password, email, website, image } = data

    // console.log(image)

    const navigation = useNavigation()

    return (
        <TouchableHighlight>
            <ImageBackground style={styles.image} source={{ uri: `https://source.unsplash.com/random/${uuid}` }} alt={image} resizeMode='cover'>
                <View style={styles.card}>
                    {/* <Text style={styles.text}>{uuid}</Text> */}
                    <Text style={styles.text} onPress={() => navigation.navigate("User", {data: data})}>{firstname}</Text>
                    <Text style={styles.text}>{lastname}</Text>
                    <Text style={styles.text}>{username}</Text>
                    <Text style={styles.text}>{password}</Text>
                    <Text style={styles.text}>{email}</Text>
                    <Text style={styles.text}>{website}</Text>
                </View>
            </ImageBackground>
        </TouchableHighlight>

        // <ImageBackground style={styles.image} source={{ uri: `https://source.unsplash.com/random/${uuid}` }} alt={image} resizeMode='cover'>
        //     <View style={styles.card}>
        //         {/* <Text style={styles.text}>{uuid}</Text> */}
        //         <Text style={styles.text}>{firstname}</Text>
        //         <Text style={styles.text}>{lastname}</Text>
        //         <Text style={styles.text}>{username}</Text>
        //         <Text style={styles.text}>{password}</Text>
        //         <Text style={styles.text}>{email}</Text>
        //         <Text style={styles.text}>{website}</Text>
        //     </View>
        // </ImageBackground>
    )

    // return (
    //     <View style={styles.card}>
    //         <View style={styles.cardTextsComtainer}>
    //             <Text>{uuid}</Text>
    //             <Text>{firstname}</Text>
    //             <Text>{lastname}</Text>
    //             <Text>{username}</Text>
    //             <Text>{password}</Text>
    //             <Text>{email}</Text>
    //             <Text>{website}</Text>
    //         </View>
    //         {/* <Image style={styles.image} source={{ uri: "http://placeimg.com/640/480/people" }} alt={image} /> */}
    //         {/* <Image style={styles.image} source={{ uri: `https://source.unsplash.com/random/${image}` }} alt={image} /> */}
    //         {/* <Image style={styles.image} source={{ uri: image }} alt={image} /> */}
    //         {/* <Image style={styles.image} source={{ uri: `https://source.unsplash.com/random/${uuid}` }} alt={image} /> */}
    //         {/* <ImageBackground style={styles.image} source={{ uri: `https://source.unsplash.com/random/${uuid}` }} alt={image} resizeMode='cover' /> */}
    //     </View>
    // )
}

const styles = StyleSheet.create({
    card: {
        // backgroundColor: "lightskyblue",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // fontSize: 20,
        // fontWeight: "600",
        // opacity: .8
        // width: "80%",
        padding: 10
    },
    image: {
        flex: 1,
        justifyContent: "center",
        // position: "absolute",
        // height: 400
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: 'center',
        color: "white",
        width: "69%",
        backgroundColor: "gray",
        padding: 10,
        margin: 6,
        opacity: .8
    },
    tinyImage: {
        width: "100%",
        height: 200
    }
})