export type TodoListProps = {
  id: string
  achievement: 'Not achieved' | 'In progress' | 'Completed'
  name: string
  limitDate: string
}