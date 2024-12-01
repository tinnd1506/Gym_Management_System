import { Box, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Link to="/">
          <Heading size={{ base: 'sm', md: 'md' }} color="white">Gym Management</Heading>
        </Link>
        
        {/* Desktop Navigation */}
        <Flex display={{ base: 'none', md: 'flex' }} gap={4}>
          {user ? (
            <>
              <Link to="/workouts">
                <Button colorScheme="whiteAlpha">Workouts</Button>
              </Link>
              <Link to="/profile">
                <Button colorScheme="whiteAlpha">Profile</Button>
              </Link>
              <Button colorScheme="whiteAlpha" onClick={logout}>
                Logout
              </Button>
            </>
          ) : !isHomePage && (
            <Link to="/">
              <Button colorScheme="whiteAlpha">Login</Button>
            </Link>
          )}
        </Flex>

        {/* Mobile Navigation */}
        <Box display={{ base: 'block', md: 'none' }}>
          {user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                colorScheme="whiteAlpha"
                aria-label="Options"
              />
              <MenuList>
                <Link to="/workouts">
                  <MenuItem>Workouts</MenuItem>
                </Link>
                <Link to="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : !isHomePage && (
            <Link to="/">
              <Button colorScheme="whiteAlpha" size="sm">Login</Button>
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
