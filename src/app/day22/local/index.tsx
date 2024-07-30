import NewTaskInput from '@/components/day22/NewTaskInput'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { database } from './_layout'

const LocalFirstAppScreen = () => {
    const [tasks, setTaks] = useState([])

    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = async () => {
        const res = await database.get("tasks").query().fetch()
        console.log(res)
        setTaks(res)
    }
  return (
    <SafeAreaView>
        <NewTaskInput />
        <Text>LocalFirstAppScreen</Text>
    </SafeAreaView>
  )
}

export default LocalFirstAppScreen