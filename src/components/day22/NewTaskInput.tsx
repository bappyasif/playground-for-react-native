import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { database } from '@/app/day22/local/_layout'
// import { useTasks } from './TasksContextProvider'
// import { useTasksStore } from './TasksStore'

import { writer } from '@nozbe/watermelondb/decorators'
import Task from './model/Task'

// type NewTaskInput = { onAdd: (data: Task) => void }


// const NewTaskInput = ({ onAdd }: { onAdd: (data: Task) => void }) => {
const NewTaskInput = () => {
    const [newTask, setNewTask] = useState("")

    // const addTask = useTasksStore(state => state.addTask)

    const onAdd = async () => {
        // addTask(newTask)
        // const newTask = await database.get('tasks').create(task => {
        //     task.title = newTask
        //     task.isFinished = false
        //   })

        Task.addTask(newTask)
    }

    return (
        <View style={styles.taskContainer}>
            <MaterialCommunityIcons
                name={'checkbox-blank-circle-outline'}
                size={24} color={"grey"}
            />
            <TextInput
                style={styles.input}
                placeholder='add a new task!'
                value={newTask} onChangeText={setNewTask}
                onEndEditing={() => {
                    if (newTask) {
                        onAdd()
                        // onAdd({ title: newTask, isFinished: false })
                        // safety reset
                        newTask && setNewTask("")
                    }
                }}
            />
        </View>
    )
}

export default NewTaskInput

const styles = StyleSheet.create({
    taskContainer: {
        padding: 5,
        // borderWidth: 1,
        // borderColor: "grey",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    input: {
        fontFamily: "Inter",
        fontSize: 15,
        color: "dimgrey",
        flex: 1,
    }
})