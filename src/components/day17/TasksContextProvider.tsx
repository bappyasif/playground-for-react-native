import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import dummyTasks from "./dummyTasks";
import { v4 } from "uuid"
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = { isFinished: boolean, title: string, id: string }

type TasksContext = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    toggleFinished: (idx: string) => void,
    deleteTask: (idx: string) => void,
    getFilteredTasks: (tab: string, searchQuery: string) => Task[],
    addTask: (title: string) => Task[] | undefined,
    numberOfCompletedTasks: number,
    totalNumberOfTasks: number
}

const TasksContext = createContext<TasksContext>({
    setTasks: () => { },
    tasks: [],
    toggleFinished: (i: string) => { },
    deleteTask: (i: string) => { },
    getFilteredTasks: (tab, searchQuery) => [],
    addTask(title) {
        return []
    },
    numberOfCompletedTasks: 0,
    totalNumberOfTasks: 0
});

const TasksContextProvider = ({ children }: PropsWithChildren) => {
    // so that during data loading our async storage doesnt get overwritten by dummydata triggered saveData call on component mount
    const [isLoadded, setIsLoaded] = useState(false)

    const [tasks, setTasks] = useState<Task[]>(dummyTasks)

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        saveData()
    }, [tasks])

    const saveData = async () => {
        // preventing to data overwritten when its not ready with async read command yet

        if(!isLoadded) {
            return
        }

        try {
            const jsonValue = JSON.stringify(tasks);
            await AsyncStorage.setItem('tasks', jsonValue);
            // await AsyncStorage.setItem('my-key', "value");
        } catch (e) {
            // saving error
            console.log(e, "error occured while saving data into device storage!!")
        }
    }

    const loadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tasks');
            if (jsonValue) {
                const loadedTasks = JSON.parse(jsonValue)
                setTasks(loadedTasks)
            }

        } catch (e) {
            // error reading value
            console.log(e, "error occured while reading data from device storage!!")
        } finally {
            // no matter what now we know that we tried read data from device
            setIsLoaded(true)
        }
    }

    const onItemPressed = (id: string) => setTasks(curr => curr.map(item => item.id !== id ? item : { ...item, isFinished: !item.isFinished }))

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

    const addTask = (title: string) => {
        const newTask: Task = {
            id: v4(),
            title,
            isFinished: false
        }
        setTasks(curr => [...curr, newTask])

        return tasks
    }

    const totalNumberOfTasks = tasks.length;
    
    const numberOfCompletedTasks = tasks.filter(item => item.isFinished).length

    return (
        <TasksContext.Provider
            value={{ tasks, setTasks, deleteTask, toggleFinished: onItemPressed, getFilteredTasks, addTask, totalNumberOfTasks, numberOfCompletedTasks }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => useContext(TasksContext)

export default TasksContextProvider