import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Reanimated from 'react-native-reanimated';
// import { Task, useTasks } from './TasksContextProvider';
import { type Task, useTasks } from './TasksContextProvider';
import { customEvent } from 'vexo-analytics';
import { useTasksStore } from './TasksStore';

const AnimatedView = Animated.createAnimatedComponent(View);

const RightActions = ({
    dragAnimatedValue,
    // onDelete,
    // index
    task
}: {
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
    // onDelete: () => void;
    // index: number
    task: Task
}) => {
    // const { deleteTask } = useTasks()
    const deleteTask = useTasksStore(state => state.deleteTask)

    const animatedStyles = {
        transform: [
            {
                translateX: dragAnimatedValue.interpolate({
                    inputRange: [-40, 0],
                    outputRange: [0, 40],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    return (
        <AnimatedView
            style={[
                {
                    backgroundColor: 'crimson',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                },
                animatedStyles,
            ]}
        >
            <MaterialCommunityIcons
                // onPress={onDelete}
                // onPress={() => deleteTask(index)}
                onPress={() => deleteTask(task.id)}

                name="delete"
                size={20}
                color="white"
            />
        </AnimatedView>
    );
};

type TaskListItem = {
    task: Task;
    // onItemPressed: () => void;
    // onDelete: () => void;
    // index: number
};

const TaskListItem = ({ task }: TaskListItem) => {
    // const { onItemPressed, deleteTask } = useTasks()
    // const onCreate = () => onItemPressed(index)

    // const { toggleFinished, deleteTask } = useTasks()
    // const onUpdate = () => toggleFinished(task.id)

    const toggleIsFinished = useTasksStore(state => state.toggleIsFinished)

    const onUpdate = () => {
        // toggleFinished(task.id)

        toggleIsFinished(task.id)

        // customEvent("todo-pressed", {complete: !task.isFinished})

        customEvent("todo-pressed", {
            // complete: !task.isFinished, 
            // we can also send in more information and data as we see fit
            purcahsed: !task.isFinished,
            total: "123.4",
            currency: "usd",
            priducts: ["prod1", "prod2"]
        })
    }

    // const onUpdate = () => onItemPressed(task.id)

    // even more better usecase for context when used it in RightActions directly instead
    // const onDelete = () => deleteTask(index)
    return (
        // to give entire list item a layout shifting view
        <Reanimated.View>
            <Swipeable
                renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
                    <RightActions
                        dragAnimatedValue={dragAnimatedValue}
                        // as we are now using uuid wont be using drilling index prop anymore
                        // index={index}
                        task={task}
                        // onDelete={onDelete}
                    />
                )}
            >
                <Pressable
                    // onPress={onCreate}
                    onPress={onUpdate}
                    // onPress={onItemPressed} 
                    style={styles.taskContainer}>
                    <MaterialCommunityIcons
                        name={
                            task.isFinished
                                ? 'checkbox-marked-circle-outline'
                                : 'checkbox-blank-circle-outline'
                        }
                        size={24}
                        color={task.isFinished ? 'gray' : 'dimgray'}
                    />
                    <Text
                        style={[
                            styles.taskTitle,
                            {
                                textDecorationLine: task.isFinished ? 'line-through' : 'none',
                                color: task.isFinished ? 'lightgray' : 'dimgray',
                            },
                        ]}
                    >
                        {task.title}
                        {/* {task.id} */}
                    </Text>
                </Pressable>
            </Swipeable>
        </Reanimated.View>
    );
};

export default TaskListItem

const styles = StyleSheet.create({
    taskContainer: {
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    taskTitle: {
        fontFamily: "Inter",
        fontSize: 15,
        flex: 1
    },
})