'use client'
import React, { useState, useEffect } from 'react'
import { Flex, Text, Button, Input } from '@chakra-ui/react'

import { TodoListProps } from './types'
import TableTable from './TaskTable'
import AddTaskModal from './AddTaskModal'

export default function Home() {
  const [todoList, setTodoList] = useState<TodoListProps[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<TodoListProps | undefined>(undefined)
  const [deleteSelectTodoId, setDeleteSelectTodoId] = useState<string | undefined>(undefined)
  const [deleteSelectTodoName, setDeleteSelectTodoName] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/taskList')
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const data = await response.json()
        setTodoList(data)
      } catch (error) {
        console.error('Error fetching todo list:', error)
      }
    }

    fetchTodoList()
  }, [openAddTaskModal, selectedTodo, deleteSelectTodoId])

  return (
    <>
      <Flex height='100vh' alignItems='center' justifyContent='center'>
        <Flex direction='column' bg={'black'} padding={12} w={'100vw'} h={'100vh'} overflow={'scroll'}>
          <Text color='white' fontSize='5xl' textAlign={'center'} padding={5}>TO DO List</Text>
          <Flex width={'70vw'} margin={'0 auto 2vh'}>
            <Button onClick={() => setOpenAddTaskModal(true)}>Add Task</Button>
            <Input bg={'white'} placeholder='search name' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </Flex>

          <TableTable
            todoList={todoList}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
            deleteSelectTodoId={deleteSelectTodoId}
            setDeleteSecectTodoId={setDeleteSelectTodoId}
            deleteSelectTodoName={deleteSelectTodoName}
            setDeleteSelectTodoName={setDeleteSelectTodoName}
            searchKeyword={searchKeyword}
          />
        </Flex>
      </Flex>
      {
        openAddTaskModal ? (
          <AddTaskModal
            isOpen={openAddTaskModal}
            onClose={() => setOpenAddTaskModal(false)}
          />
        ) : <></>
      }
    </>
  )
}
