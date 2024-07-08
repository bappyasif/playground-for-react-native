import { PropsWithChildren, createContext, useContext, useState } from "react";
import dummyTasks from "./dummyTasks";
import {v4} from "uuid"

export type Task = { isFinished: boolean, title: string, id: string }

type TasksContext = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    // onItemPressed: (idx: number) => void,
    // deleteTask: (idx: number) => void,
    toggleFinished: (idx: string) => void,
    deleteTask: (idx: string) => void,
    getFilteredTasks: (tab: string, searchQuery: string) => Task[],
    // addTask: (newTodo: Task) => void
    // addTask: (title: string) => void
    addTask: (title: string) => Task[] | undefined
}

const TasksContext = createContext<TasksContext>({
    setTasks: () => { },
    tasks: [],
    // onItemPressed: (i: number) => { },
    // deleteTask: (i: number) => { },
    toggleFinished: (i: string) => { },
    deleteTask: (i: string) => { },
    getFilteredTasks: (tab, searchQuery) => [],
    // addTask(newTodo) {

    // },
    // addTask(title) {

    // },
    addTask(title) {
        return []
    },
});

const TasksContextProvider = ({ children }: PropsWithChildren) => {
    const [tasks, setTasks] = useState<Task[]>(dummyTasks)

    // const onItemPressed = (index: number) => {
    //     setTasks(curr => {
    //         const updatedTasks = [...curr]
    //         updatedTasks[index].isFinished = !updatedTasks[index].isFinished
    //         return updatedTasks
    //     })
    // }
    
    // after refactoring with uuid
    // const onItemPressed = (id: string) => {
    //     setTasks(curr => {
    //         let updatedTasks = [...curr]
    //         updatedTasks = updatedTasks.map(item => {
    //             if(item.id === id) {
    //                 item.isFinished = !item.isFinished
    //             }

    //             return item
    //         })
    //         return updatedTasks
    //     })
    // }

    const onItemPressed = (id: string) => setTasks(curr => curr.map(item => item.id !== id ? item : {...item, isFinished: !item.isFinished}))

    // const deleteTask = (index: number) => {
    // const deleteTask = (id: string) => {
    //     setTasks(curr => {
    //         let updatedTasks = [...curr]
    //         // as we are not dealing with index anymore, which causes bugs in handling operations correctly on various tabs
    //         // updatedTasks.splice(id, 1)
    //         updatedTasks = updatedTasks.filter(item => item.id !== id)
    //         return updatedTasks
    //     })
    // }

    const deleteTask = (id: string) => setTasks(curr => curr.filter(item => item.id !== id))

    const getFilteredTasks = (tab: string, searchQuery: string) => {
        return tasks.filter((task) => {
            if (tab === "Todo" && task.isFinished) {
                return false
            }

            if (tab === "Done" && !task.isFinished) {
                return false
            }

            if (!searchQuery) {
                return true
            }

            return task.title.toLocaleLowerCase().trim().includes(searchQuery.toLocaleLowerCase().trim())
        })
    }

    // const addTask = (newTodo: Task) => setTasks(curr => [...curr, newTodo])

    // const addTask = (title: string) => {
    //     const newTask = {
    //         id: "letsee",
    //         title,
    //         isFinished: false
    //     }
    //     setTasks(curr => [...curr, newTask])
    // }

    const addTask = (title: string) => {
        const newTask:Task = {
            // id: "letsee",
            id: v4(),
            title,
            isFinished: false
        }
        setTasks(curr => [...curr, newTask])

        return tasks
    }

    return (
        <TasksContext.Provider 
            // value={{ tasks, setTasks, deleteTask, onItemPressed, getFilteredTasks, addTask }}
            value={{ tasks, setTasks, deleteTask, toggleFinished: onItemPressed, getFilteredTasks, addTask }}
            >
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => useContext(TasksContext)

export default TasksContextProvider