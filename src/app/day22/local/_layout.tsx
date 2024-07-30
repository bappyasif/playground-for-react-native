import { Slot } from 'expo-router'
import React, { useEffect, useState } from 'react'
import schema from '@/components/day22/model/schema'
import migrations from '@/components/day22/model/migration'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import Task from '@/components/day22/model/Task'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    // dbName: 'myapp',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: true, /* Platform.OS === 'ios' */
    // (optional, but you should implement this method)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
        console.log(error, "!!error!!")
    }
})

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [
        // Post, // ⬅️ You'll add Models to Watermelon here
        Task
    ],
})

const LocalFirstAppLayout = () => {
    return (
        <Slot />
    )
}

export default LocalFirstAppLayout