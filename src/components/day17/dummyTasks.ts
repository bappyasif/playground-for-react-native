import { Task } from "./TasksContextProvider";

const dummyTasks: Task[] = [
    {
        id: "1",
        title: "Setup day15 project structure",
        isFinished: true
    },
    {
        id: "2",
        title: "Render a list of todo tasks",
        isFinished: false
    },
    {
        id: "3",
        title: "Add a new task",
        isFinished: false
    },
    {
        id: "4",
        title: "Change any status of a task",
        isFinished: false
    },
    {
        id: "5",
        title: "Separate todo tasks in two tabs: todo and complete",
        isFinished: false
    }
]

export default dummyTasks

// export default [
//     {
//         title: "Setup day15 project structure",
//         isFinished: true
//     },
//     {
//         title: "Render a list of todo tasks",
//         isFinished: false
//     },
//     {
//         title: "Add a new task",
//         isFinished: false
//     },
//     {
//         title: "Change any status of a task",
//         isFinished: false
//     },
//     {
//         title: "Separate todo tasks in two tabs: todo and complete",
//         isFinished: false
//     }
// ]