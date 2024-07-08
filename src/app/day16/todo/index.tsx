import { Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import NewTaskInput from '@/components/day16/NewTaskInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskListItem from '@/components/day16/TaskListItem'
import { useHeaderHeight } from '@react-navigation/elements';
import { Task, useTasks } from '@/components/day16/TasksContextProvider'

const TodoScreen = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const [tab, setTab] = useState<"All" | "Todo" | "Done">("All")

    const headerHeight = useHeaderHeight()

    const {setTasks, deleteTask, getFilteredTasks} = useTasks()

    const filteredTasks = getFilteredTasks(tab, searchQuery)

    // const filteredTasks = tasks.filter((task) => {
    //     if (tab === "Todo" && task.isFinished) {
    //         return false
    //     }

    //     if (tab === "Done" && !task.isFinished) {
    //         return false
    //     }

    //     if (!searchQuery) {
    //         return true
    //     }

    //     return task.title.toLocaleLowerCase().trim().includes(searchQuery.toLocaleLowerCase().trim())
    // })

    // const onItemPressed = (index: number) => {
    //     setTasks(curr => {
    //         const updatedTasks = [...curr]
    //         updatedTasks[index].isFinished = !updatedTasks[index].isFinished
    //         return updatedTasks
    //     })
    // }

    // const deleteTask = (index: number) => {
    //     setTasks(curr => {
    //         const updatedTasks = [...curr]
    //         updatedTasks.splice(index, 1)
    //         return updatedTasks
    //     })
    // }

    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={110}
        >
            <Stack.Screen options={{
                headerShown: true,
                title: "Todo Lists",
                headerBackTitleVisible: false,
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
                    // as we're no longer using index rather mkaig it fullproof by using uuid for each task
                    // renderItem={({ item, index }) => <TaskListItem task={item} index={index} />}
                    // renderItem={({ item, index }) => <TaskListItem task={item} onItemPressed={() => onItemPressed(index)} onDelete={() => deleteTask(index)} />}
                    // to make sure delete action does not stay visible we will specify a distinct key for uniqueness
                    // keyExtractor={(item) => item.title}

                    // now that we have id specified in task items we doent have to explicitly define keyextrractor

                    // refactored using context provider
                    // ListFooterComponent={<NewTaskInput onAdd={(newTodo: Task) => setTasks(curr => [...curr, newTodo])} />}
                    ListFooterComponent={<NewTaskInput  />}
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