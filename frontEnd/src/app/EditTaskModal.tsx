import React, {useState} from "react"
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
  Select
} from "@chakra-ui/react"
import { TodoListProps } from './types'

type EditTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedTodo: TodoListProps
}

const _EditTaskModal = ({isOpen, onClose, selectedTodo}: EditTaskModalProps) => {
  const toast = useToast()
  const [selectedAchievement, setSelectedAchievement] = useState<string>(selectedTodo.achievement)
  const [inputName, setInputName] = useState(selectedTodo.name)
  const [selectedDate, setSelectedDate] = useState(selectedTodo.limitDate)

  const EditHandler = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/updateTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': selectedTodo.id,
          'achievement': selectedAchievement,
          'name': inputName,
          'limitDate': selectedDate,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update todo list')
      }
      toast({
        'title': 'succeeded to update',
        'status': 'success',
        'duration': 3000,
        'isClosable': true,
      })
      onClose()
    } catch (error) {
      console.error('Error updating todo list:', error);
    }
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Edit Task</ModalHeader>
        <ModalCloseButton />
        <Flex direction='column' rounded={6}>
          <Table variant='none'>
            <Tbody>
              <Tr>
                <Td>State</Td>
                <Td>
                  <Select onChange={(e) => setSelectedAchievement(e.target.value)} value={selectedAchievement}>
                    <option value='still'>Not achieved</option>
                    <option value='during'>In progress</option>
                    <option value='done'>Completed</option>
                  </Select>
                </Td>
              </Tr>
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
            <Button color='white' bg='black' onClick={EditHandler}>Save changing</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const EditTaskModal = React.memo(_EditTaskModal)
export default EditTaskModal