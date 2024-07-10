import React from "react";
import { Slot, Stack } from "expo-router"
import TasksContextProvider from "../../../components/day17/TasksContextProvider"
// import TasksContextProvider from "@/components/day16/TaskContextProvider"

export default function TodoLayout() {
    return (
        <TasksContextProvider>
            <Stack.Screen options={{ headerShown: false }} />
            <Stack />
        </TasksContextProvider>
    )
}