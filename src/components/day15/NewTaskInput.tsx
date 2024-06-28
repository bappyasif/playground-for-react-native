import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Task } from '@/app/day15/todo'

// { tasks, setTasks }: { tasks: string[], setTasks }
// { isFinished: boolean, title: string }

type NewTaskInput = { onAdd: (data: Task) => void }

const NewTaskInput = ({ onAdd }: { onAdd: (data: Task) => void }) => {
    const [newTask, setNewTask] = useState("")

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
                // autoFocus 
                // onEndEditing={() => {
                //     newTask && setTasks(curr => [...curr, { title: newTask, isFinished: false }])
                //     setNewTask("")
                // }} 
                onEndEditing={() => {
                    if (newTask) {
                        onAdd({ title: newTask, isFinished: false })
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