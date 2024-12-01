import { useState, useEffect, useCallback, memo } from 'react';
import {
  Container,
  VStack,
  Heading,
  Button,
  HStack,
  Input,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';
import WorkoutList from '../components/WorkoutList';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkouts } from '../context/WorkoutContext';

const WorkoutPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [searchParams, setSearchParams] = useState({ name: '', status: '' });
  const { fetchWorkouts } = useWorkouts();

  useEffect(() => {
    const initialFetch = async () => {
      try {
        await fetchWorkouts();
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };
    initialFetch();
  }, []);

  const handleSearch = useCallback(async () => {
    const params = {};
    if (searchParams.name) {
      params.name = searchParams.name;
    }
    if (searchParams.status && searchParams.status !== '') {
      params.status = searchParams.status;
    }
    try {
      await fetchWorkouts(params);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }, [searchParams, fetchWorkouts]);

  const handleEdit = useCallback((workout) => {
    setSelectedWorkout(workout);
    onOpen();
  }, [onOpen]);

  const handleCreate = useCallback(() => {
    setSelectedWorkout(null);
    onOpen();
  }, [onOpen]);

  const handleModalClose = useCallback(() => {
    setSelectedWorkout(null);
    onClose();
  }, [onClose]);

  const handleSearchParamChange = useCallback((field, value) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <Container maxW="container.xl" py={4} px={{ base: 2, md: 8 }}>
      <VStack spacing={6} align="stretch">
        <HStack 
          justify="space-between" 
          flexDir={{ base: 'column', sm: 'row' }}
          spacing={{ base: 4, sm: 0 }}
        >
          <Heading size={{ base: 'lg', md: 'xl' }}>Workouts</Heading>
          <Button colorScheme="blue" onClick={handleCreate}>
            Create Workout
          </Button>
        </HStack>

        <VStack spacing={4}>
          <HStack 
            spacing={4} 
            w="100%" 
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Input
              placeholder="Search by name"
              value={searchParams.name}
              onChange={(e) => handleSearchParamChange('name', e.target.value)}
            />
            <Select
              value={searchParams.status}
              onChange={(e) => handleSearchParamChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <Button 
              onClick={handleSearch}
              w={{ base: '100%', md: 'auto' }}
            >
              Search
            </Button>
          </HStack>
        </VStack>

        <Box overflowX="auto">
          <WorkoutList onEdit={handleEdit} />
        </Box>

        <Modal isOpen={isOpen} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedWorkout ? 'Edit Workout' : 'Create Workout'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <WorkoutForm
                workout={selectedWorkout}
                onClose={handleModalClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default memo(WorkoutPage);
