import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"

import { TodoListTypes } from "./types"
import EditTaskModalButton from "./EditTaskModalButton"
import DeleteTaskModalButton from "./DeleteTaskModalButton"

type TableTableProps = {
  todoList: TodoListTypes[]
  searchKeyword: string
  refetch: () => void
}

const _TableTable = ({ todoList, searchKeyword, refetch }: TableTableProps) => {
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
        {todoList.length > 0 ? (
          <Tbody>
            {todoList
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
        ) : (
          <></>
        )}
      </Table>
    </>
  )
}

const TableTable = React.memo(_TableTable)
export default TableTable
