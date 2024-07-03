import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';

const NotificationsScreen = () => {
  return (
    <View>
      <Text>NotificationsScreen</Text>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  )
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: { seconds: 2 },
    });
  }

export default NotificationsScreen

const styles = StyleSheet.create({})