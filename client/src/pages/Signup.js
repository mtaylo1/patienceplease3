import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_DOCTOR } from '../utils/mutations';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  HStack,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];
function Signup(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({ drEmail: '', drPassword: '' });
  const [addDoctor, { error }] = useMutation(ADD_DOCTOR);

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addDoctor({
      variables: {
        drFirstName: formState.drFirstName,
        drLastName: formState.drLastName,
        drEmail: formState.drEmail,
        drPassword: formState.drPassword
      },
    });
    const token = mutationResponse.data.addDoctor.token;
    Auth.login(token);
  };

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Keep Track of Patients{' '}
            <Text
              as={'span'}
              bg="#5CC8FF"
              bgClip="text">
              &
            </Text>{' '}
            Appoinments {' '}
            <Text
              as={'span'}
              bg="#5CC8FF"
              bgClip="text">
              &
            </Text>{' '}
            Medical Information
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bg: "#5CC8FF",
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bg: "#52AD9C",
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Sign Up Today
              <Text
                as={'span'}
                bg="#5CC8FF"
                bgClip="text">
                !
              </Text>
            </Heading>
          </Stack>
          <Flex>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Box>
                <form onSubmit={handleFormSubmit}>
                  <HStack>
                    <Box>
                      <label htmlFor="drFirstName">First Name:</label>
                      <Input
                        color='gray.500'
                        bg={'gray.100'}
                        placeholder="First"
                        name="drFirstName"
                        type="drFirstName"
                        id="drFirstName"
                        onChange={handleChange}
                      />
                    </Box>
                    <Box>
                      <label htmlFor="drLastName">Last Name:</label>
                      <Input
                        color='gray.500'
                        bg={'gray.100'}
                        placeholder="Last"
                        name="drLastName"
                        type="drLastName"
                        id="drLastName"
                        onChange={handleChange}
                      />
                    </Box>
                  </HStack>
                  <Box mt={5}>
                    <label htmlFor="drEmail">Email:</label>
                    <Input
                      color='gray.500'
                      bg={'gray.100'}
                      placeholder="youremail@test.com"
                      name="drEmail"
                      type="drEmail"
                      id="drEmail"
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mt={5}>
                    <label htmlFor="drPassword">Password:</label>
                    <HStack>
                      <Input
                        color='gray.500'
                        bg={'gray.100'}
                        placeholder="******"
                        name="drPassword"
                        type={showPassword ? 'text' : 'password'}
                        id="drPassword"
                        onChange={handleChange}
                      />
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </HStack>
                  </Box>
                  <Box>
                    <Button
                      type="submit"
                      fontFamily={'heading'}
                      mt={8}
                      w={'full'}
                      bg="#5CC8FF"
                      color={'white'}
                      _hover={{
                        transform: 'scale(1.2)',
                        boxShadow: 'xl',
                      }}>
                      Sign up!</Button>
                  </Box>
                </form>
                {error && <div>Sign up failed</div>}
                <Box mt={5} align='center'>
                  Already have an account? <Link to="/login">Sign-in now!</Link>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export default Signup;