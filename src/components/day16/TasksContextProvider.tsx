import { PropsWithChildren, createContext, useContext, useState } from "react";
import dummyTasks from "./dummyTasks";

export type Task = { isFinished: boolean, title: string }

type TasksContext = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TasksContext = createContext<TasksContext>({
    setTasks: () => {},
    tasks: []
});

const TasksContextProvider = ({ children }: PropsWithChildren) => {
    const [tasks, setTasks] = useState<Task[]>(dummyTasks)
    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => useContext(TasksContext)

export default TasksContextProvider