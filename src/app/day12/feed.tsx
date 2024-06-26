import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import VideoPost from '@/components/day12/VideoPost';

const dummyPosts = [
    {
        id: '2',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
        caption: 'Caption of the post',
    },
    {
        id: '1',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
        caption: 'Hey there',
    },
    {
        id: '3',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
        caption: 'Hola',
    },
    {
        id: '4',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
        caption: 'Piano practice',
    },
    {
        id: '5',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
        caption: 'Hello World!',
    },
];

const FeedScreen = () => {
    const [activePostId, setActivePostId] = useState(dummyPosts[0].id)
    const [posts, setPosts] = useState<typeof dummyPosts>([])

    // const onViewableItemsChanged = useCallback(({ changed, viewableItems }) => {
    //     if (viewableItems.length > 0 && viewableItems[0]?.isViewable) {
    //         setActivePostId(viewableItems[0]?.item?.id)
    //     }
    // }, [])

    // this way we wont be trigger any re render when there is some changes in status
    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: { itemVisiblePercentThreshold: 50 },
            onViewableItemsChanged: ({ changed, viewableItems }) => {
                if (viewableItems.length > 0 && viewableItems[0]?.isViewable) {
                    setActivePostId(viewableItems[0]?.item?.id)
                }
            }
        },
    ])

    // mimickinig fetching from db 
    useEffect(() => {
        const fetchPosts = async () => {
            // fetch initial posts data

            setPosts(dummyPosts)
        }

        fetchPosts()
    }, [])

    // to have infinite scrolling effect
    const onEndReached = () => {
        // console.log("end reached!!")
        // fetch more posts data
        setPosts(curr => [...curr, ...dummyPosts]) // mimicking data being added
        console.log("end reached!!")
    }

    console.log(posts.length)

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <StatusBar style='auto' />

            <FlatList
                // data={dummyPosts}
                data={posts}
                renderItem={({ item }) => <VideoPost videoPost={item} activePostId={activePostId} />}

                // keyExtractor={(item, idx) => `${item.id}--${idx}`}
                
                showsVerticalScrollIndicator={false}

                // so that next item is on screen when scrolled
                pagingEnabled

                // due to error thrown we will use an alternative and recommended way to do these instead
                // // what percentage of item needs to be viisble ot consider it as viewing item
                // viewabilityConfig={{
                //     itemVisiblePercentThreshold: 50
                // }}

                // // so that we can keep track of which item is currentyly visible
                // onViewableItemsChanged={onViewableItemsChanged}

                viewabilityConfigCallbackPairs={ viewabilityConfigCallbackPairs.current }

                onEndReached={onEndReached}
                onEndReachedThreshold={2} // when two more posts is left to view
            />

            {/* <VideoPost videoPost={dummyPosts[0]} /> */}
        </View>
    )
}

export default FeedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    }
})