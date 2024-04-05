import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getSearchResults, getTrending } from '~/services/api'
import { Input, ScrollView, Spinner, YStack } from 'tamagui'
import { Container, Main, Subtitle, Title } from '~/tamagui.config'
import MovieCard from '~/components/MovieCard'
import { useDebounce } from '~/utils/useDebounce'

const HomePage = () => {
  const [queryStr, setQuery] = useState<string>("")

  const {debouncedValue} = useDebounce(queryStr, 900)

  const trendingQuery = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrending(1)
  });

  const searchQuery = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => getSearchResults( debouncedValue),
    enabled: debouncedValue.length > 0
  });

  const { data, isLoading, isFetching, isError } = trendingQuery

  const { data:sQueryData, isLoading: qIsLoading, isFetching: qIsFetching, isError:qIsError } = searchQuery

  // console.log(sQueryData)
  return (
    <Main>
      <Link href={"/(drawer)/home/movie/1234"}>1</Link>
      <ImageBackground
        source={{ uri: "https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg" }}
        style={{ width: "100%", height: 200 }}
      >
        <Container>
          <YStack>
            <Title
              color={"#000"}
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10
              }}
              animation={"quick"}
            >
              Trending
            </Title>
            <Input placeholder='search for a movie, tv series or a person....' placeholderTextColor={"#fff"} borderWidth={4} size={"$4.5"} value={queryStr} onChangeText={setQuery} />
          </YStack>
        </Container>
      </ImageBackground>

      <Subtitle 
        p={10}
        enterStyle={{
          opacity: 0
        }}
        animation={"lazy"}
      >
        {sQueryData?.results ? "Search Results" : "Trending"}
      </Subtitle>

      {
        (isLoading || qIsLoading)
        ? (
          <Spinner py={13} size='large' color={"$blue11"} />
        )
        : null
      }

      <ScrollView horizontal showsHorizontalScrollIndicator={false} py={40} contentContainerStyle={{gap: 13, paddingLeft: 13}}>
        {/* {
          data?.results?.map(item => <MovieCard key={item.id} movie={item} />)
        } */}
        {
          (sQueryData?.results.length ? sQueryData : data)?.results?.map(item => <MovieCard key={item.id} movie={item} />)
        }
      </ScrollView>
    </Main>
  )
}

export default HomePage

const styles = StyleSheet.create({})