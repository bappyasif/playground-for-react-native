import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      // initialRouteName='About'
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          initialParams={{
            name: "Guest"
          }}
        />
        <Stack.Screen
          name='About'
          component={AboutScreen}
          // passing default parameters
          initialParams={{
            name: "Guest"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}