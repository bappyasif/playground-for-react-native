import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import { Pressable, Text } from 'react-native';
const Stack = createNativeStackNavigator()

export const JustStack = () => {
  return (
    <Stack.Navigator
        // initialRouteName='About'
        // all these options will be available to all screens of this navigator stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6a51ae" },
          headerTintColor: "#fae",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <Pressable onPress={() => alert("menu button is pressed....")}>
              <Text style={{ color: "floralwhite", fontSize: 18 }}>Menu</Text>
            </Pressable>
          ),
          contentStyle: {
            backgroundColor: "#e8e4f3"
          }
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          initialParams={{
            name: "Guest"
          }}
          options={{
            // to make header have a custom name other than what's been stated in "name"
            title: "Landing Page",
            // all of these styles are limited to any given screen only, for passed down to all navigation they needs to be in included in Stack.Navigator
            // headerStyle: { backgroundColor: "#6a51ae" },
            // headerTintColor: "#fae",
            // headerTitleStyle: { fontWeight: "bold" },
            // headerRight: () => (
            //   <Pressable onPress={() => alert("menu button is pressed....")}>
            //     <Text style={{ color: "floralwhite", fontSize: 18 }}>Menu</Text>
            //   </Pressable>
            // ),
            // contentStyle: {
            //   backgroundColor: "#e8e4f3"
            // }
          }}
        />
        <Stack.Screen
          name='About'
          component={AboutScreen}
          // passing default parameters
          initialParams={{
            name: "Guest"
          }}
          options={({route}) => ({
            // to dynamically include header name in screen, when navigation.navigate is passed down with a "name" key value pair as second parameter

            // this is more suitable if this needs to be updated "statically" but not for "dynamic changes"
            title: route.params.name
          })}
        />
      </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>

      <JustStack />

      {/* <Stack.Navigator
        // initialRouteName='About'
        // all these options will be available to all screens of this navigator stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6a51ae" },
          headerTintColor: "#fae",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <Pressable onPress={() => alert("menu button is pressed....")}>
              <Text style={{ color: "floralwhite", fontSize: 18 }}>Menu</Text>
            </Pressable>
          ),
          contentStyle: {
            backgroundColor: "#e8e4f3"
          }
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          initialParams={{
            name: "Guest"
          }}
          options={{
            // to make header have a custom name other than what's been stated in "name"
            title: "Landing Page",
            // all of these styles are limited to any given screen only, for passed down to all navigation they needs to be in included in Stack.Navigator
            // headerStyle: { backgroundColor: "#6a51ae" },
            // headerTintColor: "#fae",
            // headerTitleStyle: { fontWeight: "bold" },
            // headerRight: () => (
            //   <Pressable onPress={() => alert("menu button is pressed....")}>
            //     <Text style={{ color: "floralwhite", fontSize: 18 }}>Menu</Text>
            //   </Pressable>
            // ),
            // contentStyle: {
            //   backgroundColor: "#e8e4f3"
            // }
          }}
        />
        <Stack.Screen
          name='About'
          component={AboutScreen}
          // passing default parameters
          initialParams={{
            name: "Guest"
          }}
          options={({route}) => ({
            // to dynamically include header name in screen, when navigation.navigate is passed down with a "name" key value pair as second parameter

            // this is more suitable if this needs to be updated "statically" but not for "dynamic changes"
            title: route.params.name
          })}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}