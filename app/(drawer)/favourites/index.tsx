import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMMKVObject } from "react-native-mmkv"
import { Favourites } from '~/interfaces/favourites'
import { Container, Main } from '~/tamagui.config'
import { Image, ListItem, ScrollView } from 'tamagui'
import { Link } from 'expo-router'
import Animated from 'react-native-reanimated'

const FavouritesPage = () => {
  const [favourites, setFavourites] = useMMKVObject<Favourites[]>("favourites")

  return (
    <Main>
      <Container>
        <ScrollView>
          {favourites?.map(fav => (
            <Link href={`/(drawer)/favourites/${fav.mediaType}/${fav.id}`} asChild>
              <ListItem
                theme={"alt2"}
                size={"$4"}
                title={fav?.name}
                icon={() => (
                  <Animated.Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${fav.thumb}` }}
                    style={{ width: 53, height: 53 }}
                    sharedTransitionTag={`${fav.mediaType === "movie" ? "movie" : "tv"}-${fav.id}`}
                  />
                )}
              > 

              </ListItem>
            </Link>
          ))}
        </ScrollView>
      </Container>
    </Main>
  )
}

export default FavouritesPage

const styles = StyleSheet.create({})