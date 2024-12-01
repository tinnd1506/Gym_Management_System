import { useState, useEffect } from 'react';
import {
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const UserPage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState({
    email: '',
    username: '',
    fitnessGoals: '',
    workoutPreferences: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/user/profile');
        setProfile({
          email: response.data.email,
          username: response.data.username,
          fitnessGoals: response.data.fitness_goals || '',
          workoutPreferences: response.data.workout_preferences || '',
        });
      } catch (error) {
        toast({
          title: 'Error fetching profile',
          description: error.message,
          status: 'error',
          duration: 3000,
        });
      }
    };

    fetchProfile();
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/user/profile', profile);
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Container maxW="container.md" py={4} px={{ base: 4, md: 8 }}>
      <VStack spacing={6} align="stretch">
        <Heading size={{ base: 'lg', md: 'xl' }}>User Profile</Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={profile.email}
                onChange={handleChange}
                isReadOnly
              />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Fitness Goals</FormLabel>
              <Textarea
                name="fitnessGoals"
                value={profile.fitnessGoals}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Workout Preferences</FormLabel>
              <Textarea
                name="workoutPreferences"
                value={profile.workoutPreferences}
                onChange={handleChange}
              />
            </FormControl>

            <Button 
              type="submit" 
              colorScheme="blue" 
              width="100%"
              size={{ base: 'md', md: 'lg' }}
            >
              Update Profile
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default UserPage;
