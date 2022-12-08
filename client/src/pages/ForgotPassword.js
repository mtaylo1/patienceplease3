import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_DOCTOR } from '../utils/mutations';
import {
    Button,
    Checkbox,
    Text,
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    InputGroup,
    HStack,
    InputRightElement,
    useColorModeValue
} from '@chakra-ui/react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const ForgotPassword = (props) => {
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
                                Forgot Password
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
                                                Reset Password!</Button>
                                        </Box>
                                    </form>
                                    {error && <div>Email not found</div>}
                                </Box>
                                <Box mt={5} align='center'>
                                    <Link to="/login" align="center">Back to Sign In!</Link>
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

export default ForgotPassword;