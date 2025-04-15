import { useSQLiteContext } from "expo-sqlite"

export type TaskDatabase = {
  id: number
  title: string
  date: string
  discription: string
  status: string
  flag: string
  type: string
}

export function useTaskDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<TaskDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO tasks (title, date, discription, status, flag, type) VALUES ($title, $date, $discription, $status, $flag, $type)"
    )

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $date: data.date,
        $discription: data.discription,
        $status: data.status,
        $flag: data.flag,
        $type: data.type
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByTitle(title: string) {
    try {
      const query = "SELECT * FROM tasks WHERE title LIKE ?"

      const response = await database.getAllAsync<TaskDatabase>(
        query,
        `%${title}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: TaskDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE tasks SET title = $title, date = $date, discription = $discription, status = $status, flag = $flag, type = $type WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $title: data.title,
        $date: data.date,
        $discription: data.discription,
        $status: data.status,
        $flag: data.flag,
        $type: data.type        
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM tasks WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM tasks WHERE id = ?"

      const response = await database.getFirstAsync<TaskDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  async function getAll() {
    try {
        const response = await database.getAllAsync<TaskDatabase>("SELECT * FROM tasks");
        return response
        
    } catch (error) {
        console.log(error)
        throw error;
        
    }
}

  return { create, searchByTitle, update, remove, show ,getAll}
}