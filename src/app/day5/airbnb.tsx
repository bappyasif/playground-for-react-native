import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Stack } from 'expo-router';
import appartments from "@assets/data/day5/appartments.json"
import CustomMarker from '@/components/day5/custom-marker';
import ApartmentListItem from '@/components/day5/apartment-list-item';
// import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import apts from "@assets/data/day5/appartments.json"

const AirbnbMapScreen = () => {

  const [aptSelected, setAptSelected] = useState<typeof apts[0] | null>(null)

  const [mapRegion, setMapRgion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    // these delta are use for zoom parameters
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  // ref
  // const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // variables
  const snapPoints = useMemo(() => [65, "25%", "50%", "90%"], []);
  // const snapPoints = useMemo(() => [65, "25%"], []);



  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      {/* <MapView style={styles.map} /> */}
      <MapView
        style={styles.map}
      // provider={PROVIDER_GOOGLE}
      region={mapRegion}
      // initialRegion={mapRegion}
      >
        {
          appartments.map(apt => <CustomMarker key={apt.id} apt={apt} onPress={() => setAptSelected(apt)} />)
        }

      </MapView>
      {/* option 2: much better */}
      {
        aptSelected
          ? (
            <ApartmentListItem apt={aptSelected} containerStyle={{
              position: "absolute",
              bottom: snapPoints[0] as number + 10,
              // bottom: 80,
              left: 10,
              right: 10,
            }} />
          ) : null
      }

      {/* option 1 */}
      {/* {
        aptSelected
          ? (
            <View style={{
              position: "absolute",
              bottom: 40,
              // padding: 10,
              left: 10,
              right: 10,
            }}>
              <ApartmentListItem apt={aptSelected} />
            </View>
          ) : null
      } */}

      {/* {
          aptSelected ? <ApartmentListItem apt={appartments[0]} /> : null
        } */}

      <BottomSheet
        // ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      // enablePanDownToClose
      >
        <View style={styles.contentContainer}>
          <Text style={styles.listTitle}>Over {appartments.length} places 🔥</Text>
          <BottomSheetFlatList
            data={appartments}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => <ApartmentListItem apt={item} />}
          />
          {/* we can use BottomSheet flatlist for more gestures */}
          {/* <FlatList 
            data={appartments}
            contentContainerStyle={{gap: 10, padding: 10}}
            renderItem={({item}) => <ApartmentListItem apt={item} />}
          /> */}
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  map: { height: "100%", width: "100%" },
  contentContainer: {
    flex: 1
  },
  listTitle: {
    textAlign: "center",
    fontFamily: "InterBold",
    fontSize: 16,
    marginBottom: 20
  }
});

export default AirbnbMapScreen

/**
 * 
 * 
 const AirbnbMapScreen = () => {
  console.log(appartments.length)
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView style={styles.map}>
        {
          appartments.map(apt => (
            <Marker
              coordinate={{ latitude: apt.latitude, longitude: apt.longitude }}
              title={apt.title}
              description={apt.title}
            />
          ))
        }
      </MapView>
    </View>
  )
}
 */

/**
 * 
 * 
 const AirbnbMapScreen = () => {
  console.log(appartments.length)
  return (
    <View>
      <Stack.Screen options={{headerShown: false}} />
      <MapView style={styles.map}>
        <Marker 
          coordinate={{latitude: 23.7104, longitude: 90.4071}} 
          title='Dhaka'
          description='Capital city'
        />
      </MapView>
    </View>
  )
}
 */