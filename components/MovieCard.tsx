import React from 'react'
import { ResultItem } from '~/interfaces/apiresults'
import { Link } from 'expo-router'
import { Card, CardHeader, Image, Paragraph, Text, YStack } from 'tamagui'
import Animated from 'react-native-reanimated'

type Props = {
    movie: ResultItem
}

// const MovieCard = ({movie}: Props) => {
//     return (
//       // add tv medie type
//       <Link href={`/(drawer)/home/${movie.media_type === "movie" ? "movie" : "tv"}/${movie.id}`}>
//           <Text color={"#fff"} backgroundColor={"$background"}>{movie.name}</Text>
//       </Link>
//     )
//   }

const MovieCard = ({ movie }: Props) => {
    return (
        // add tv medie type
        <Link href={`/(drawer)/home/${movie.media_type === "movie" ? "movie" : "tv"}/${movie.id}`} asChild>
            <Card
                elevate w={150} h={260} scale={.9}
                hoverStyle={{ scale: .96 }}
                pressStyle={{ scale: .98 }}
                animation={"bouncy"}
            >
                <Card.Header p={0}>
                    <Animated.Image
                        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                        alt={movie.title}
                        style={{
                            width: 150,
                            height: 200
                        }}
                        sharedTransitionTag={`${movie.media_type === "movie" ? "movie" : "tv"}-${movie?.id}`}
                    />

                    {/* <Image source={{uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`}} alt={movie.title} 
                style={{
                    width: 150,
                    height: 200
                }}
                /> */}
                </Card.Header>

                <Card.Footer p={8}>
                    <YStack>
                        <Text fontSize={20} color={"lightblue"}>{movie?.title || movie?.name}</Text>
                        <Paragraph theme={"alt2"}>
                            {new Date(movie?.release_date || movie?.first_air_date!).getFullYear()}
                        </Paragraph>
                    </YStack>
                </Card.Footer>
            </Card>
        </Link>
    )
}

export default MovieCard