import { Button, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import NewTaskInput from '@/components/day15/NewTaskInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskListItem from '@/components/day15/TaskListItem'
import { useHeaderHeight } from '@react-navigation/elements';

export type Task = { isFinished: boolean, title: string }

const dummytasks: Task[] = [
    {
        title: "Setup day15 project structure",
        isFinished: true
    },
    {
        title: "Render a list of todo tasks",
        isFinished: false
    },
    {
        title: "Add a new task",
        isFinished: false
    },
    {
        title: "Change any status of a task",
        isFinished: false
    },
    {
        title: "Separate todo tasks in two tabs: todo and complete",
        isFinished: false
    }
]

const TodoScreen = () => {
    const [tasks, setTasks] = useState(dummytasks)

    const [searchQuery, setSearchQuery] = useState("")

    const [tab, setTab] = useState<"All" | "Todo" | "Done">("All")

    const headerHeight = useHeaderHeight()

    const filteredTasks = tasks.filter((task) => {
        if(tab === "Todo" && task.isFinished) {
            return false
        }

        if(tab === "Done" && !task.isFinished) {
            return false
        }

        if(!searchQuery) {
            return true
        }

        return task.title.toLocaleLowerCase().trim().includes(searchQuery.toLocaleLowerCase().trim())
    })

    const onItemPressed = (index: number) => {
        setTasks(curr => {
            const updatedTasks = [...curr]
            updatedTasks[index].isFinished = !updatedTasks[index].isFinished
            return updatedTasks
        })
    }

    const deleteTask = (index: number) => {
        setTasks(curr => {
            const updatedTasks = [...curr]
            updatedTasks.splice(index, 1)
            return updatedTasks
        })
    }

    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={110}
        >
            {/* <Stack.Screen options={{ title: "TODO" }} /> */}

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
                // paddingTop: headerHeight + 35 
                paddingTop: 65 + 35 
            }}
            >
                <View style={{flexDirection: "row", marginTop: 10, justifyContent: "space-around"}}>
                    <Button title='All' onPress={() => setTab("All")} />
                    <Button title='Todo' onPress={() => setTab("Todo")} />
                    <Button title='Done' onPress={() => setTab("Done")} />
                </View>

                <FlatList
                    contentContainerStyle={{ gap: 5, padding: 10, marginTop: 10 }}
                    // data={tasks}
                    data={filteredTasks}
                    removeClippedSubviews={false}
                    renderItem={({ item, index }) => <TaskListItem task={item} onItemPressed={() => onItemPressed(index)} onDelete={() => deleteTask(index)} />}
                    // to make sure delete action does not stay visible we will specify a distinct key for uniqueness
                    keyExtractor={(item) => item.title}

                    // renderItem={({ item, index }) => (
                    //     <Pressable
                    //         onPress={() => onItemPressed(index)}
                    //         style={styles.taskContainer}
                    //     >
                    //         <MaterialCommunityIcons
                    //             name={item.isFinished ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
                    //             size={24} color={item.isFinished ? "darkgray" : "dimgrey"}
                    //         />
                    //         <Text style={[styles.taskTitle, { textDecorationLine: item.isFinished ? "line-through" : "none", color: item.isFinished ? "darkgrey" : "dimgrey" }]}>{item.title}</Text>
                    //     </Pressable>
                    // )}

                    // ListFooterComponent={<NewTaskInput />}
                    // ListFooterComponent={() => <NewTaskInput onAdd={(newTodo: typeof tasks[0]) => setTasks(curr => [...curr, newTodo])} />}
                    // ListFooterComponent={() => <NewTaskInput onAdd={(newTodo: Task) => setTasks(curr => [...curr, newTodo])} />}
                    
                    ListFooterComponent={<NewTaskInput onAdd={(newTodo: Task) => setTasks(curr => [...curr, newTodo])} />}

                    // keyboardDismissMode={'interactive'}


                // ListFooterComponent={() => (
                //     <View style={styles.taskContainer}>
                //         <MaterialCommunityIcons
                //             name={'checkbox-blank-circle-outline'}
                //             size={24} color={"grey"}
                //         />
                //         <TextInput style={styles.input} placeholder='add a new task!' value={newTask} onChangeText={setNewTask} autoFocus onEndEditing={() => {
                //             newTask && setTasks(curr => [...curr, {title: newTask, isFinished: false}])
                //             setNewTask("")
                //         }} />
                //     </View>
                // )}
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
    },
    
    // taskContainer: {
    //     padding: 5,
    //     // borderWidth: 1,
    //     // borderColor: "grey",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     gap: 10
    // },
    // taskTitle: {
    //     fontFamily: "Inter",
    //     fontSize: 15,
    //     // color: "dimgrey",
    //     flex: 1
    // },

    // input: {
    //     fontFamily: "Inter",
    //     fontSize: 15,
    //     color: "dimgrey",
    //     flex: 1,
    // }
})