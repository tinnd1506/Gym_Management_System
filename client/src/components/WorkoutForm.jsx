import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useWorkouts } from '../context/WorkoutContext';

const WorkoutForm = ({ workout, onClose }) => {
  const [formData, setFormData] = useState({
    name: workout?.name || '',
    description: workout?.description || '',
    status: workout?.status || 'active',
  });

  const { createWorkout, updateWorkout } = useWorkouts();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (workout) {
        response = await updateWorkout(workout.id, formData);
      } else {
        response = await createWorkout(formData);
      }
      onClose();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          {workout ? 'Update Workout' : 'Create Workout'}
        </Button>
      </VStack>
    </Box>
  );
};

export default WorkoutForm;
