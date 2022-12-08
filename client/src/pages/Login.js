import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_DOCTOR } from '../utils/mutations';
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Stack,
  Image,
  HStack,
  Text,
  Box,
  useColorModeValue
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_DOCTOR);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'sm'}>
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
                Sign In
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
                      <Checkbox>Remember me</Checkbox>
                    </Box>
                    <Box mt={5} align='center'>
                      <Link to="/forgotpassword">Forgot password?</Link>
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
                        Sign in!</Button>
                    </Box>
                  </form>
                  {error && <div>Sign up failed</div>}
                </Box>
                <Box mt={5} align='center'>
                  No Account? <Link to="/signup">Sign-up now!</Link>
                </Box>
              </Box>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
};

export default Login;