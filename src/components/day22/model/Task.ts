// model/Post.js
import { database } from '@/app/day22/local/_layout';
import { Model } from '@nozbe/watermelondb'
import { field, text, writer } from '@nozbe/watermelondb/decorators'

export default class Task extends Model {
  static table = 'tasks'

  @text("title") title;
  @field("is_finished") isFinished;

  @writer static async addTask(title) {
    return await database.get('tasks').create(task => {
        task.title = title
        task.isFinished = false
      })
  }
}