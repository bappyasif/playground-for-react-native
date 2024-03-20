import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils'
import UsersList from '../components/UsersList';

export default function HomeTab() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchData().then(data => setData(data)).catch(err => console.log(err)).finally(() => setLoading(false))
    }, [])

    return (
        <View>
            <Text>HomeTab {data?.length ? data?.length : ""}</Text>
            {
                loading
                    ? (
                        <>
                            <ActivityIndicator size={"large"} />
                            <Text>Data Loading....</Text>
                        </>
                    )
                    : null
            }
            
            {
                data?.length
                ? <UsersList data={data} />
                : null
            }
        </View>
    )
}