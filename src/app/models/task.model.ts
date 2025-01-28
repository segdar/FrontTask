export interface Task {
  id: string,
  title: string,
  description: string,
  date_creation: Date
  status: number,
  user_creation: string
}

export enum TaskStatus {
  Pendiente = 0,
  Completada = 1,
}
