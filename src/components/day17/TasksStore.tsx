import { create } from 'zustand'
import dummyTasks from './dummyTasks'
import { Task } from './TasksContextProvider'
import { v4 } from 'uuid'

export const useTasksStore = create((set, get) => ({
    tasks: dummyTasks,
    
    // totalNumberOfTasks: get(state => state.tasks).length,
    
    // numberOfCompletedTasks: get(state => state.tasks).filter(item => item.isFinished).length,

    totalNumberOfTasks: () => get(state => state.tasks).tasks.length,
    
    numberOfCompletedTasks: () => get(state => state.tasks).tasks.filter(item => item.isFinished).length,
    
    addTask: (title: string) => {
        const newTask: Task = {
            id: v4(),
            title,
            isFinished: false
        }

        set(state => ({tasks: [...state.tasks, newTask]}))
    },
    
    deleteTask: (id: string) => {
        set(state => ({tasks: state.tasks.filter(item => item.id !== id)}))
        // setTasks(curr => curr.filter(item => item.id !== id))
    },
    
    toggleIsFinished: (id: string) => {
        set(state => ({tasks: state.tasks.map(item => item.id !== id ? item : { ...item, isFinished: !item.isFinished })}))
        
        // setTasks(curr => curr.map(item => item.id !== id ? item : { ...item, isFinished: !item.isFinished }))
    },
    
    getFilteredTasks: (tab: string, searchQuery: string) => {
        const tasks = get(state => state.tasks).tasks
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
  }))




// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))