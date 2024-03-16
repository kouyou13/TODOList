export type TodoListProps = {
  id: string
  achievement: 'still' | 'during' | 'done'
  name: string
  limitDate: string
}