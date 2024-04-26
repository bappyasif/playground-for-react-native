import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { ExpoPushToken } from 'expo-notifications';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import * as Notifications from "expo-notifications"
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >(undefined);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const {profile} = useAuth()

    const savePushToken = async (newToken: string | undefined) => {
        setExpoPushToken(newToken)

        // console.warn(newToken, "newToken --- outside")

        if(!newToken) {
            return
        }

        // update token in db
        await supabase.from("profiles").update({expo_push_token: newToken}).eq("id", profile.id)

        // console.warn(newToken, "newToken")
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            // setExpoPushToken(token)
            savePushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(
                    notificationListener.current,
                );
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };

    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default NotificationProvider