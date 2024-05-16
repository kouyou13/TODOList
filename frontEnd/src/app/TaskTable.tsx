import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Spacer, IconButton } from '@chakra-ui/react'

import { TodoListProps } from './types'
import EditTaskModal from "./EditTaskModal"
import DeleteTaskModal from "./DeleteTaskModal"
import { GrDropbox } from "react-icons/gr"

type TableTableProps = {
  todoList : TodoListProps[]
  selectedTodo: TodoListProps | undefined
  setSelectedTodo: React. Dispatch<React.SetStateAction<TodoListProps | undefined>>
  deleteSelectTodoId: string | undefined
  setDeleteSelectTodoId: React.Dispatch<React.SetStateAction<string | undefined>>
  deleteSelectTodoName: string | undefined
  setDeleteSelectTodoName: React.Dispatch<React.SetStateAction<string | undefined>>
  searchKeyword: string
}

const _TableTable = ({
  todoList, selectedTodo,
  setSelectedTodo,
  deleteSelectTodoId,
  setDeleteSelectTodoId,
  deleteSelectTodoName,
  setDeleteSelectTodoName,
  searchKeyword,
}: TableTableProps) => {
  return(
    <>
      <Table bg={'white'} variant={'none'} width={'60vw'} margin={'0 auto'} rounded={6}>
        <Thead>
          <Tr>
            <Th>State</Th>
            <Th>Name</Th>
            <Th>Limit</Th>
            <Th>Edit</Th>
            <Th>Drop</Th>
          </Tr>
        </Thead>
        {
          todoList.length > 0 ? (
            <Tbody>
              {todoList
                .filter((todo) => searchKeyword === '' || todo.name.indexOf(searchKeyword) !== -1)
                .map((todo) => (
                  <Tr key={todo.id}>
                    <Td>{todo.achievement}</Td>
                    <Td>{todo.name}</Td>
                    <Td>{todo.limitDate}</Td>
                    <Td>
                      <Button
                        bg={'black'}
                        color={'white'}
                        onClick={() => setSelectedTodo({
                          'id': todo.id,
                          'achievement': todo.achievement,
                          'name': todo.name,
                          'limitDate': todo.limitDate,
                        })}
                      >
                        Edit
                      </Button>
                    </Td>
                    <Td>
                      <IconButton
                        icon={<GrDropbox />}
                        onClick={() => {
                          setDeleteSelectTodoId(todo.id)
                          setDeleteSelectTodoName(todo.name)
                        }}
                        aria-label='drop button'
                      />
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          ) : <></>
        }
      </Table>

      {
        selectedTodo != null ? (
          <EditTaskModal
            isOpen={true}
            onClose={() => setSelectedTodo(undefined)}
            selectedTodo={selectedTodo}
          />
        ) : <></>
      }

      {
        deleteSelectTodoId != null && deleteSelectTodoName != null ? (
          <DeleteTaskModal
            isOpen={true}
            onClose={() => setDeleteSelectTodoId(undefined)}
            deleteSelectTodoId={deleteSelectTodoId}
            deleteSelectTodoName={deleteSelectTodoName}
          />
        ) : <></>
      }
    </>
  )
}

const TableTable = React.memo(_TableTable)
export default TableTable