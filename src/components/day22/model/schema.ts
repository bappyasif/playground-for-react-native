import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
//   version: 1,
version: 2,
  tables: [
    tableSchema({
        name: "tasks",
        columns: [
            // id's are automatically created by watermelon
            {name: "title", type: "string"},
            {name: "is_finished", type: "boolean"}
        ]
    })
  ]
})