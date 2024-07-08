import { Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import NewTaskInput from '@/components/day16/NewTaskInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskListItem from '@/components/day16/TaskListItem'
import { useTasks } from '@/components/day16/TasksContextProvider'

const TodoScreen = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const [tab, setTab] = useState<"All" | "Todo" | "Done">("All")

    const { getFilteredTasks, numberOfCompletedTasks, totalNumberOfTasks } = useTasks()

    const filteredTasks = getFilteredTasks(tab, searchQuery)

    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={110}
        >
            <Stack.Screen options={{
                // headerShown: true,
                title: "Todo Lists",
                headerBackTitleVisible: false,
                headerRight: () => <Text style={{fontFamily: "InterBold", color: "darkgrey"}}>{numberOfCompletedTasks} / {totalNumberOfTasks}</Text>,
                headerSearchBarOptions: {
                    hideWhenScrolling: true,
                    onChangeText: (e) => setSearchQuery(e.nativeEvent.text)
                }
            }}
            />

            <SafeAreaView
                edges={['bottom']}
                style={{
                    flex: 1,
                    paddingTop: 65
                }}
            >
                <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-around" }}>
                    <Button title='All' onPress={() => setTab("All")} />
                    <Button title='Todo' onPress={() => setTab("Todo")} />
                    <Button title='Done' onPress={() => setTab("Done")} />
                </View>

                <FlatList
                    contentContainerStyle={{ gap: 5, padding: 10, marginTop: 10 }}
                    data={filteredTasks}
                    removeClippedSubviews={false}
                    renderItem={({ item }) => <TaskListItem task={item} />}
                    ListFooterComponent={<NewTaskInput />}
                />

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default TodoScreen

const styles = StyleSheet.create({
    page: {
        // padding: 10,
        backgroundColor: "whitesmoke",
        flex: 1
    }
})