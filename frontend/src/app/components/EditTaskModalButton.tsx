import React, { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Spacer,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  Input,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  HStack,
  Button,
  useToast,
  Select,
  useDisclosure,
} from "@chakra-ui/react"
import { TodoList } from "../types/types"
import { GetNow } from "../utils/GetNow"

type EditTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedTodo: TodoList
}

const _EditTaskModal = ({
  isOpen,
  onClose,
  selectedTodo,
}: EditTaskModalProps) => {
  const toast = useToast()
  const [selectedAchievement, setSelectedAchievement] = useState<string>(
    selectedTodo.achievement,
  )
  const [inputName, setInputName] = useState(selectedTodo.name)
  const [selectedDate, setSelectedDate] = useState(selectedTodo.limitDate)
  const now = GetNow()
  const minDate = `${now.year}-${now.month}-${now.date}`

  const EditHandler = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedTodo.id,
          achievement: selectedAchievement,
          name: inputName,
          limitDate: selectedDate,
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to update todo list")
      }
      toast({
        title: "succeeded to update",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
      onClose()
    } catch (error) {
      console.error("Error updating todo list:", error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Edit Task</ModalHeader>
        <ModalCloseButton />
        <Flex direction="column" rounded={6}>
          <Table variant="none">
            <Tbody>
              <Tr>
                <Td>State</Td>
                <Td>
                  <Select
                    onChange={(e) => setSelectedAchievement(e.target.value)}
                    value={selectedAchievement}
                  >
                    <option value="Not achieved">Not achieved</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>Task Name</Td>
                <Td>
                  <Input
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Task Limit</Td>
                <Td>
                  <Input
                    type="date"
                    min={minDate}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
        <ModalFooter>
          <HStack w={"100%"}>
            <Spacer />
            <Button onClick={onClose}>Cancel</Button>
            <Button color="white" bg="#1c1c1c" onClick={EditHandler}>
              Save changing
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
const EditTaskModal = React.memo(_EditTaskModal)

type EditTaskModalButtonProps = {
  selectedTodo: TodoList
  refetch: () => void
}

const _EditTaskModalButton = ({
  selectedTodo,
  refetch,
}: EditTaskModalButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button bg="#1c1c1c" color="white" onClick={onOpen}>
        Edit
      </Button>
      {isOpen && (
        <EditTaskModal
          isOpen={isOpen}
          onClose={() => {
            onClose()
            refetch()
          }}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  )
}
const EditTaskModalButton = React.memo(_EditTaskModalButton)
export default EditTaskModalButton
