import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Tabs, withLayoutContext } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OrdersScreenForActives from '.';
import OrdersScreenForArchive from './archive';

// probably depricated!!
const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

// const TopTabs = createMaterialTopTabNavigator()

const AdminOrdersScreenTopTabsLayout = () => {
    const insets = useSafeAreaInsets();

  return (
    <SafeAreaView 
        style={{
                flex: 1, 
                backgroundColor: Colors.light.background, 
                // paddingTop: insets.top, 
                // paddingBottom: insets.bottom
        }}
        // depricated
        // edges={["top"]}
    >
        {/* <TopTabs.Navigator>
            <TopTabs.Screen name='Actives' component={OrdersScreenForActives} />
            <TopTabs.Screen name='Archives' component={OrdersScreenForArchive} />
        </TopTabs.Navigator> */}

        <TopTabs>
            <TopTabs.Screen name='index' options={{title: "Active"}} />
            <TopTabs.Screen name='archive' options={{title: "Archives"}} />
        </TopTabs>
    </SafeAreaView>
  )
}

export default AdminOrdersScreenTopTabsLayout