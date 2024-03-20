import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeTab from "./screens/self-hw/screens/Home"
import User from "./screens/self-hw/screens/User"

const Tabs = createBottomTabNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Tabs.Navigator>
                <Tabs.Screen name="Home" component={HomeTab} options={{}} />
                <Tabs.Screen name="User" component={User} 
                // options={{
                //     tabBarShowLabel: false
                // }} 
                />
            </Tabs.Navigator>
        </NavigationContainer>
    )
}