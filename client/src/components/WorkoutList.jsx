import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  HStack,
  useToast,
  VStack,
  Text,
  Card,
  CardBody,
  Stack,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useWorkouts } from '../context/WorkoutContext';

const WorkoutList = ({ onEdit }) => {
  const { workouts, deleteWorkout, changeWorkoutStatus } = useWorkouts();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const response = await deleteWorkout(id);
        toast({
          title: response.message,
          status: 'success',
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
        });
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await changeWorkoutStatus(id, newStatus);
      toast({
        title: response.message,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  // Mobile card view
  if (isMobile) {
    return (
      <VStack spacing={4} width="100%">
        {workouts.map((workout) => (
          <Card key={workout.id} width="100%">
            <CardBody>
              <Stack spacing={3}>
                <Heading size="md">{workout.name}</Heading>
                <Text>{workout.description}</Text>
                <HStack justify="space-between">
                  <Badge
                    as="button"
                    onClick={() => handleStatusChange(
                      workout.id,
                      workout.status === 'active' ? 'inactive' : 'active'
                    )}
                    cursor="pointer"
                    colorScheme={workout.status === 'active' ? 'green' : 'red'}
                  >
                    {workout.status}
                  </Badge>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => onEdit(workout)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(workout.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    );
  }

  // Desktop table view
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workouts.map((workout) => (
            <Tr key={workout.id}>
              <Td>{workout.name}</Td>
              <Td>{workout.description}</Td>
              <Td>
                <Badge
                  as="button"
                  onClick={() => handleStatusChange(
                    workout.id,
                    workout.status === 'active' ? 'inactive' : 'active'
                  )}
                  cursor="pointer"
                  colorScheme={workout.status === 'active' ? 'green' : 'red'}
                >
                  {workout.status}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => onEdit(workout)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(workout.id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WorkoutList;
