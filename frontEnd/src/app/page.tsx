"use client"
import React, { useState, useEffect } from "react"
import { Flex, Text, Input, HStack } from "@chakra-ui/react"

import { TodoList } from "./types/types"
import TableTable from "./TaskTable"
import AddTaskModalButton from "./AddTaskModalButton"

export default function Home() {
  const [todoList, setTodoList] = useState<TodoList[]>([])
  const [keyword, setKeyword] = useState("")

  const fetchTodoList = async () => {
    console.log('aa')
    try {
      const response = await fetch("http://127.0.0.1:8000/taskList")
      if (!response.ok) {
        throw new Error("Failed to fetch")
      }
      const data = await response.json()
      setTodoList(data)
    } catch (error) {
      console.error("Error fetching todo list:", error)
    }
  }
  useEffect(() => {
    fetchTodoList()
  }, [])

  return (
    <>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        w="100vw"
        bg="#1c1c1c"
      >
        <Flex direction="column" w="80vw" h="80vh">
          <Text color="white" fontSize="5xl" textAlign={"center"} padding={5}>
            TODO List
          </Text>
          <HStack w={"70vw"} margin={"2vh auto"}>
            <AddTaskModalButton refetch={fetchTodoList} />
            <Input
              bg={"white"}
              placeholder="search name"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </HStack>

          <TableTable
            todoList={todoList}
            searchKeyword={keyword}
            refetch={fetchTodoList}
          />
        </Flex>
      </Flex>
    </>
  )
}
