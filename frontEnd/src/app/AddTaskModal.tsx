import { Modal, ModalOverlay, ModalContent, Spacer, Flex, Table, Tbody, Tr, Td, Input, ModalCloseButton, ModalHeader, ModalFooter, HStack, Button, useToast} from "@chakra-ui/react"
import React, {useState} from "react"

type AddTaskModalProps = {
  isOpen: boolean
  onClose: () => void
}

const _AddTaskModal = ({isOpen, onClose}: AddTaskModalProps) => {
  const toast = useToast()
  const [inputName, setInputName] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const addTask = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': inputName,
          'limitDate': selectedDate,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update todo list')
      }
      toast({
        'title': 'succeeded to register',
        'status': 'success',
        'duration': 3000,
        'isClosable': true,
      })
      onClose()
    } catch (error) {
      console.error('Error updating todo list:', error);
    }
  }

  const addTaskHandler = async () => {
    if(!inputName || inputName === ''){
      toast({
        'title': 'name is not input',
        'status': 'error',
        'duration': 3000,
        'isClosable': true,
      })
    }
    else if(!selectedDate || selectedDate === ''){
      toast({
        'title': 'task limit is not selected',
        'status': 'error',
        'duration': 3000,
        'isClosable': true,
      })
    }
    else{
      addTask()
    }
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Add Task</ModalHeader>
        <ModalCloseButton />
        <Flex direction='column' rounded={6}>
          <Table variant='none'>
            <Tbody>
              <Tr>
                <Td>task name</Td>
                <Td><Input value={inputName} onChange={(e) => setInputName(e.target.value)} /></Td>
              </Tr>
              <Tr>
                <Td>task limit</Td>
                <Td><Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
        <ModalFooter>
          <HStack w={'100%'}>
            <Spacer />
            <Button onClick={onClose}>Cancel</Button>
            <Button color='white' bg='black' onClick={() => addTaskHandler()}>Save & Close</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const AddTaskModal = React.memo(_AddTaskModal)
export default AddTaskModal