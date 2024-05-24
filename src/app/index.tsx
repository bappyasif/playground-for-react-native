import { DayListItem } from '@/components/core/DayListItem';
import { FlatList, StyleSheet, View } from 'react-native';

// import { DayListItem } from '../components/core/DayListItem';

// all globally required resources (fonts, async calls, etc) needs to be handled in app entry pount, in this case its root layout file

export default function HomeScreen() {

    const nums = [...Array(20)].map((v, i) => i + 1)

    return (
        <View style={styles.container}>
            <FlatList
                data={nums}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => (
                    <DayListItem day={item} />
                )}
                numColumns={2}
                columnWrapperStyle={styles.column}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    content: {
        gap: 10,
        padding: 20
    },

    column: {
        gap: 10
    },
});


// // as this is no longer our app entry point as it was before using expo router, these fonts and async resources wont be viable in other routes

// // Keep the splash screen visible while we fetch resources
// // SplashScreen.preventAutoHideAsync();

// export default function HomeScreen() {
// //   let [fontsLoaded, fontError] = useFonts({
// //     Inter: Inter_900Black,
// //     Amatic: AmaticRegular,
// //     AmaticBold: AmaticBold
// //   });

// //   useEffect(() => {
// //     if(fontsLoaded || fontError) {
// //       SplashScreen.hideAsync()
// //     }
// //   }, [fontsLoaded, fontError])

// //   if (!fontsLoaded && !fontError) {
// //     return <ActivityIndicator />;
// //   }

//   const nums = [...Array(20)].map((v,i) => i + 1)

//   return (
//     <View style={styles.container}>
//       <FlatList 
//          data={nums}
//          contentContainerStyle={styles.content}
//          renderItem={({item}) => (
//           <DayListItem day={item} />
//          )}
//          numColumns={2}
//          columnWrapperStyle={styles.column}
//       />
//     </View>
//   );
// }