import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ImageBackground } from 'react-native'
import Animated from 'react-native-reanimated'
import { H1, Image, Paragraph, ScrollView, Text, YStack } from 'tamagui'
import { MediaType } from '~/interfaces/apiresults'
import { getMovieDetails } from '~/services/api'
import { Main } from '~/tamagui.config'

type Props = {
    mediaType: MediaType,
    id: string
}

export const DetailsPage = ({id, mediaType}: Props) => {
    const movieQuery = useQuery({
        queryKey: ["movie", id],
        queryFn: () => getMovieDetails(+id, mediaType)
    })

    const {data} = movieQuery

  return (
    <Main>
        <ScrollView>
            <ImageBackground
                source={{
                    uri: `https://image.tmdb.org/t/p/w200${data?.backdrop_path}`
                }}
            >
                <Animated.Image 
                    borderRadius={8}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w200${data?.poster_path}`
                    }}
                    sharedTransitionTag={`${mediaType === "movie" ? "movie" : "tv"}-${id}`}
                    style={{
                        width: 200, height: 400, margin: 11
                    }}
                />
                {/* <Image 
                    m={20}
                    borderRadius={8}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w200${data?.poster_path}`
                    }}
                    w={200}
                    h={400}
                /> */}
            </ImageBackground>

            <YStack
                p={11}
                animation={"lazy"}
                enterStyle={{
                    opacity: 0,
                    y: 10
                }}
            >
                <H1 color={"$blue8"}>
                    {data?.title || data?.name} 
                    <Text fontSize={17}>({new Date(data?.release_date).getFullYear()})</Text>
                </H1>

                <Paragraph theme={"alt2"}>{data?.tagline}</Paragraph>

                <Text fontSize={17}>{data?.overview}</Text>
            </YStack>
        </ScrollView>
    </Main>
    // <View>
    //     <Text>DetailsPage - {id} - {mediaType}</Text>
    // </View>
  )
}
