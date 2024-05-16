"use client"
import React, { useState } from "react"
import { Flex, Text, Input, HStack } from "@chakra-ui/react"

import { TodoListTypes } from "./types"
import TableTable from "./TaskTable"
import AddTaskModalButton from "./AddTaskModalButton"

export default function Home() {
  const [todoList, setTodoList] = useState<TodoListTypes[]>([])
  const [keyword, setKeyword] = useState("")

  const fetchTodoList = async () => {
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
  fetchTodoList()

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          bg={"black"}
          padding={12}
          w={"100vw"}
          h={"100vh"}
          overflow={"scroll"}
        >
          <Text color="white" fontSize="5xl" textAlign={"center"} padding={5}>
            TO DO List
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
