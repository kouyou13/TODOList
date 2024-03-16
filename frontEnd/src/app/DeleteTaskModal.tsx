import { Modal, ModalOverlay, ModalContent, Flex, ModalCloseButton, ModalHeader, ModalFooter, Button, HStack, Spacer, Text, useToast} from "@chakra-ui/react"
import React from "react"

type DeleteTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  deleteSelectTodoId: string
  deleteSelectTodoName: string
}

const _DeleteTaskModal = ({isOpen, onClose, deleteSelectTodoId, deleteSelectTodoName}: DeleteTaskModalProps) => {
  const toast = useToast()

  const DeleteHandler = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/deleteTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': deleteSelectTodoId,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update todo list')
      }
      toast({
        'title': 'succeeded to delete',
        'status': 'success',
        'duration': 3000,
        'isClosable': true,
      })
      onClose()
    } catch (error) {
      console.error('Error delete todo list:', error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Delete Task</ModalHeader>
        <ModalCloseButton />
        <Flex direction='column' rounded={6}>
          <Text textAlign='center'>Are you sure that delete 「{deleteSelectTodoName}」 ?</Text>
        </Flex>
        <ModalFooter>
          <HStack w={'100%'}>
            <Spacer />
            <Button onClick={onClose}>Cancel</Button>
            <Button color='white' bg='black' onClick={DeleteHandler}>Save changing</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const DeleteTaskModal = React.memo(_DeleteTaskModal)
export default DeleteTaskModal