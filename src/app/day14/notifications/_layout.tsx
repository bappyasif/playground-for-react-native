import { View, Text, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Slot, router } from 'expo-router'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from "@expo/vector-icons"


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const NotificationsLayout = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
    // console.warn("notifications setup")

    useEffect(() => {
        // so that when we are handling with notifications we make sure to do all this while in mounted state.
        // sometinmes in async functions such as these app mount status might be unmounted even though they are in mouted beforehand those async functions could do their actions
        let isMounted = true;
        // fetch expo push token
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token)
            }
        }).catch(err => console.log(err))

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
            // when we want navigate to specific route screen upon user interaction with notification from device notifications tray
            redirect(response.notification)
        });

        Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

        return () => {
            // notificationListener.current?.remove()
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);

            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);

            isMounted = false
        }
    }, [])

    function redirect(notification: Notifications.Notification) {
        const url = notification.request.content.data?.url;
        if (url) {
          router.push(url);
        }
      }

    console.log("Token: ", expoPushToken)
    console.log("notifications: ", notification)
    return (
        <>
            <Slot />
            {
                notification
                    ? (
                        <View style={{
                            // alignItems: 'center', 
                            justifyContent: 'center', position: "absolute", bottom: 31, left: 10, right: 10, backgroundColor: "whitesmoke", padding: 10, borderRadius: 10
                        }}>
                            <Text style={{ fontFamily: "InterBold" }}>Title: {notification && notification.request.content.title} </Text>
                            <Text>Body: {notification && notification.request.content.body}</Text>
                            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>

                            <MaterialCommunityIcons style={{ position: "absolute", top: 10, right: 10 }} name='close' size={26} color={"black"} onPress={() => setNotification(undefined)} />
                        </View>
                    ) : null
            }
        </>
    )
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId
                    // projectId: "f5ce5e23-e612-491f-8f1e-0c2b13864e30"
                })
            ).data;
            console.log(token);
        } catch (e) {
            token = `${e}`;
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export default NotificationsLayout