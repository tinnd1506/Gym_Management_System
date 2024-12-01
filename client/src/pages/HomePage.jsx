import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/workouts');
    }
  }, [user, navigate]);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={4}>Rise. Grind. Conquer.</Heading>
          <Text fontSize="lg" color="gray.600">
            Please login or register to manage your workouts
          </Text>
        </Box>
        <AuthForm />
      </VStack>
    </Container>
  );
};

export default HomePage;
