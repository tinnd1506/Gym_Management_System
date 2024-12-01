import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={20}>
      <VStack spacing={6}>
        <Heading size="2xl">404</Heading>
        <Heading size="xl">Page Not Found</Heading>
        <Text fontSize="lg">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => navigate('/')}
          size="lg"
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage; 