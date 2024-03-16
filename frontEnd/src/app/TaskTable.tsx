import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Spacer } from '@chakra-ui/react'
import Image from "next/image"

import { TodoListProps } from './types'
import EditTaskModal from "./EditTaskModal"
import DeleteTaskModal from "./DeleteTaskModal"
import dustbox from '../../public/dustBox.png'

type TableTableProps = {
  todoList : TodoListProps[]
  selectedTodo: TodoListProps | undefined
  setSelectedTodo: React. Dispatch<React.SetStateAction<TodoListProps | undefined>>
  deleteSelectTodoId: string | undefined
  setDeleteSecectTodoId: React.Dispatch<React.SetStateAction<string | undefined>>
  deleteSelectTodoName: string | undefined
  setDeleteSelectTodoName: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const changeStateView = (state: 'still' | 'during' | 'done') => {
  if(state === 'still') return 'Not achieved'
  else if(state === 'during') return 'In progress'
  else if(state === 'done') return 'Completed'
}

const _TableTable = ({todoList, selectedTodo, setSelectedTodo, deleteSelectTodoId, setDeleteSecectTodoId, deleteSelectTodoName, setDeleteSelectTodoName}: TableTableProps) => {
  return(
    <>
      <Table bg={'white'} variant={'none'} width={'60vw'} margin={'0 auto'} rounded={6}>
        <Thead>
          <Tr>
            <Th>State</Th>
            <Th>Name</Th>
            <Th>Limit</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        {
          todoList.length > 0 ? (
            <Tbody>
              {todoList.map((todo) => (
                <Tr key={todo.id}>
                  <Td>{changeStateView(todo.achievement)}</Td>
                  <Td>{todo.name}</Td>
                  <Td>{todo.limitDate}</Td>
                  <Td>
                    <Flex>
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
                      <Spacer />
                      <Image
                        src={dustbox}
                        height={30}
                        width={30}
                        alt="ゴミ箱のアイコン"
                        onClick={() => {
                          setDeleteSecectTodoId(todo.id)
                          setDeleteSelectTodoName(todo.name)
                        }}
                      />
                      <Spacer />
                    </Flex>
                  </Td>
                </Tr>
              ))}
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
            onClose={() => setDeleteSecectTodoId(undefined)}
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