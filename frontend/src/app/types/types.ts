export type AchievementOperator =
  | "Not achieved"
  | "In progress"
  | "Completed"

export type TodoList = {
  readonly id: string
  readonly achievement: AchievementOperator
  readonly name: string
  readonly limitDate: string
}