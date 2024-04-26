import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { ExpoPushToken } from 'expo-notifications';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import * as Notifications from "expo-notifications"

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

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
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