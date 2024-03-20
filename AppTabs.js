import { NavigationContainer } from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import SettingsScreen from "./screens/SettingsScreen"
import CourseScreen from "./screens/CourseScreen"
import ProfileScreen from "./screens/ProfileScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { JustStack } from "./AppStack"

const Tabs = createBottomTabNavigator()

export default function App () {
    return (
        <NavigationContainer>
            <Tabs.Navigator
            screenOptions={{
                // tabBarLabelPosition: "beside-icon"
                tabBarLabelPosition: "below-icon",
                // tabBarShowLabel: false,
                tabBarActiveTintColor: "purple",
                tabBarActiveBackgroundColor: "#e8e4f3",
                tabBarInactiveTintColor: "#fae"
            }}
            >
                <Tabs.Screen name="Settings" component={SettingsScreen} options={{
                    tabBarIcon: ({color}) => <Ionicons name="settings" color={color} size={20} />
                }} />
                <Tabs.Screen name="Profile" component={ProfileScreen} options={{
                    // title: "Some Profile"
                    tabBarLabel: "some profile",
                    tabBarIcon: ({color}) => <Ionicons name="person" size={20} color={color} />,
                    tabBarBadge: 4
                }} />
                <Tabs.Screen name="Course" component={CourseScreen} options={{
                    tabBarIcon: ({color}) => <Ionicons name="person-circle" color={color} size={20} />
                }} />
                {/* nested a stack navigator within tab navigator */}
                {/* its also preferred not to have many nested navigation */}
                <Tabs.Screen 
                    name="Just Stacks" component={JustStack} 
                    // to not show tab header for this nested navigation we can use options and define headerShown to false
                    options={{
                        headerShown: false,
                        tabBarLabel: "Others",
                        tabBarIcon: ({color}) => <Ionicons name="ellipse" color={color} size={20} />
                    }}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    )
}