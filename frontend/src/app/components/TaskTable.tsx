import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import React from "react"

import DeleteTaskModalButton from "./DeleteTaskModalButton"
import EditTaskModalButton from "./EditTaskModalButton"
import { TodoList } from "../types/types"
import expiredDecision from "../utils/ExpiredDecision"

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
    return todoList.filter(
      (todo) =>
        (checkedNotAchieved && todo.achievement === "Not achieved") ||
        (checkedInProgress && todo.achievement === "In progress") ||
        (checkedCompleted && todo.achievement === "Completed"),
    )
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
                  <Td color={expiredDecision(todo.limitDate) && todo.achievement !== "Completed" ? "red" : ""}>{todo.limitDate}</Td>
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
