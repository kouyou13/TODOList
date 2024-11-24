import { Text, Input, HStack, Box, Checkbox, Flex, useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

import AddTaskModalButton from './AddTaskModalButton'
import TableTable from './TaskTable'
import { TodoList } from '../types/types'

const _Home = () => {
  const [todoList, setTodoList] = useState<TodoList[]>([])
  const [keyword, setKeyword] = useState('')
  const [checkedNotAchieved, setCheckedNotAchieved] = useState(false)
  const [checkedInProgress, setCheckedInProgress] = useState(false)
  const [checkedCompleted, setCheckedInCompleted] = useState(false)

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
  useEffect(() => {
    fetchTodoList()
  }, [])

  return (
    <>
      <Box mt="5vh" justifyContent="center" bg="#1c1c1c">
        <Text color="white" fontSize="5xl" textAlign="center" padding={5}>
          TODO List
        </Text>
        <HStack w="70vw" margin="0 auto">
          <AddTaskModalButton refetch={fetchTodoList} />
          <Input
            bg={'white'}
            placeholder="search name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </HStack>
        <Flex alignItems="center" justifyContent="center" gap={20}>
          <Checkbox color="white" p={1} onChange={(e) => setCheckedNotAchieved(e.target.checked)}>
            Not achieved
          </Checkbox>
          <Checkbox color="white" p={1} onChange={(e) => setCheckedInProgress(e.target.checked)}>
            In progress
          </Checkbox>
          <Checkbox color="white" p={1} onChange={(e) => setCheckedInCompleted(e.target.checked)}>
            Completed
          </Checkbox>
        </Flex>
        <TableTable
          todoList={todoList}
          searchKeyword={keyword}
          refetch={fetchTodoList}
          checkedNotAchieved={checkedNotAchieved}
          checkedInProgress={checkedInProgress}
          checkedCompleted={checkedCompleted}
        />
      </Box>
    </>
  )
}
const Home = React.memo(_Home)
export default Home
