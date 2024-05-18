import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button,
  HStack,
  Spacer,
  Text,
  useToast,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { TodoList } from "./types/types"
import React from "react"
import { GrDropbox } from "react-icons/gr"

type DeleteTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedTodo: TodoList
}

const _DeleteTaskModal = ({
  isOpen,
  onClose,
  selectedTodo,
}: DeleteTaskModalProps) => {
  const toast = useToast()

  const DeleteHandler = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/deleteTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedTodo.id,
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to update todo list")
      }
      toast({
        title: "succeeded to delete",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
      onClose()
    } catch (error) {
      console.error("Error delete todo list:", error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Delete Task</ModalHeader>
        <ModalCloseButton />
        <Flex direction="column" rounded={6}>
          <Text textAlign="center">
            Are you sure that delete 「{selectedTodo.name}」 ?
          </Text>
        </Flex>
        <ModalFooter>
          <HStack w={"100%"}>
            <Spacer />
            <Button onClick={onClose}>Cancel</Button>
            <Button color="white" bg="#1c1c1c" onClick={DeleteHandler}>
              Save changing
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
const DeleteTaskModal = React.memo(_DeleteTaskModal)

type DeleteTaskModalButtonProps = {
  selectedTodo: TodoList
  refetch: () => void
}

const _DeleteTaskModalButton = ({
  selectedTodo,
  refetch,
}: DeleteTaskModalButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        icon={<GrDropbox />}
        onClick={onOpen}
        aria-label="drop button"
      />
      {isOpen && (
        <DeleteTaskModal
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
const DeleteTaskModalButton = React.memo(_DeleteTaskModalButton)
export default DeleteTaskModalButton
