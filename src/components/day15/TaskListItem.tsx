import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Task } from '@/app/day15/todo'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';

// type TaskListItem = {
//     task: Task,
//     onItemPressed: () => void
// }

const AnimatedView = Animated.createAnimatedComponent(View);

const RightActions = ({
    dragAnimatedValue,
    onDelete,
}: {
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
    onDelete: () => void;
}) => {
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
                onPress={onDelete}
                name="delete"
                size={20}
                color="white"
            />
        </AnimatedView>
    );
};

type TaskListItem = {
    task: Task;
    onItemPressed: () => void;
    onDelete: () => void;
};

const TaskListItem = ({ task, onItemPressed, onDelete }: TaskListItem) => {
    // const RightActions = ({
    //     dragAnimatedValue,
    // }: {
    //     dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
    // }) => {

    //     return (
    //         <AnimatedView
    //             style={[
    //                 {
    //                     backgroundColor: 'crimson',
    //                     alignItems: 'center',
    //                     flexDirection: 'row',
    //                     paddingHorizontal: 10,
    //                 },
    //             ]}
    //         >
    //             <MaterialCommunityIcons
    //                 onPress={onDelete}
    //                 name="delete"
    //                 size={20}
    //                 color="white"
    //             />
    //         </AnimatedView>
    //     );
    // };
    return (
        // to give entire list item a layout shifting view
        <Reanimated.View>
            <Swipeable
                renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
                    <RightActions
                        dragAnimatedValue={dragAnimatedValue}
                        onDelete={onDelete}
                    />
                )}
            >
                <Pressable onPress={onItemPressed} style={styles.taskContainer}>
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
        // borderWidth: 1,
        // borderColor: "grey",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    taskTitle: {
        fontFamily: "Inter",
        fontSize: 15,
        // color: "dimgrey",
        flex: 1
    },
})