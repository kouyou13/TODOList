import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"

import { TodoList } from "./types/types"
import EditTaskModalButton from "./EditTaskModalButton"
import DeleteTaskModalButton from "./DeleteTaskModalButton"

type TableTableProps = {
  todoList: TodoList[]
  searchKeyword: string
  refetch: () => void
  checkedNotAchieved: boolean
  checkedInProgress: boolean
  checkedCompleted: boolean
}

const _TableTable = ({
  todoList,
  searchKeyword,
  refetch,
  checkedNotAchieved,
  checkedInProgress,
  checkedCompleted,
}: TableTableProps) => {
  const filteredTodoList = (todoList: TodoList[]) => {
    if (!checkedNotAchieved && !checkedInProgress && !checkedCompleted) {
      return todoList
    }
    const notAchievedList = checkedNotAchieved
      ? todoList.filter((todo) => todo.achievement === "Not achieved")
      : []
    const inProgressList = checkedInProgress
      ? todoList.filter((todo) => todo.achievement === "In progress")
      : []
    const completedList = checkedCompleted
      ? todoList.filter((todo) => todo.achievement === "Completed")
      : []
    return [...notAchievedList, ...inProgressList, ...completedList]
  }

  return (
    <>
      <Table
        bg={"white"}
        variant={"none"}
        width={"60vw"}
        margin={"0 auto"}
        rounded={6}
        overflowX="scroll"
      >
        <Thead>
          <Tr>
            <Th>State</Th>
            <Th>Name</Th>
            <Th>Limit</Th>
            <Th>Edit</Th>
            <Th>Drop</Th>
          </Tr>
        </Thead>
        {todoList.length > 0 && (
          <Tbody>
            {filteredTodoList(todoList)
              .filter(
                (todo) =>
                  searchKeyword === "" ||
                  todo.name.indexOf(searchKeyword) !== -1,
              )
              .map((todo) => (
                <Tr key={todo.id}>
                  <Td>{todo.achievement}</Td>
                  <Td>{todo.name}</Td>
                  <Td>{todo.limitDate}</Td>
                  <Td>
                    <EditTaskModalButton
                      selectedTodo={todo}
                      refetch={refetch}
                    />
                  </Td>
                  <Td>
                    <DeleteTaskModalButton
                      selectedTodo={todo}
                      refetch={refetch}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        )}
      </Table>
    </>
  )
}

const TableTable = React.memo(_TableTable)
export default TableTable
