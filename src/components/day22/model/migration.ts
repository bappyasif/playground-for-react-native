import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    // We'll add migration definitions here later
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
          name: 'tasks',
          columns: [
            {name: "title", type: "string"},
            {name: "is_finished", type: "boolean"}
          ],
        }),
      ],
    }
  ],
})