import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme.web';
import { useClientOnlyValue } from '@/components/useClientOnlyValue.web';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // tabBarActiveTintColor: Colors[colorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>

      {/* as we have changed index screen to menu now we need to make sure that index named screen is pointinbg to null so that it doesnt show up in tabs bottonm screen of app */}
      <Tabs.Screen name='index' options={{ href: null }} />

      <Tabs.Screen
        // name="index"
        name="menu"
        options={{
          // title: 'Tab One',
          title: 'Menu',
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          headerShown: false, // removing header from menu tab
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={20}
                    // color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          // title: 'Tab Two',
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
