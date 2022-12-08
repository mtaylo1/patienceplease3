import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  HStack,
  Heading,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Box,
  Image,
  Stack,
  useColorMode
} from '@chakra-ui/react'
import {
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';


function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Breadcrumb separator=''>
                    <BreadcrumbItem>
          <Box
              m={8}
              as='button'
              height='40px'
              lineHeight='1.2'
              transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
              px='25px'
              borderRadius='5px'
              fontSize='25px'
              bg='#53687E'
              color='#FEFEE3'
              _hover={{
                bg: '#53687E',
                transform: 'scale(1.2)',
                boxShadow: 'xl'
              }}
            >
              <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/myAccount' >Doctor Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </Box>
          </BreadcrumbItem>
          <BreadcrumbItem>
          <Box
              m={8}
              as='button'
              height='40px'
              lineHeight='1.2'
              transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
              px='25px'
              borderRadius='5px'
              fontSize='25px'
              bg='#53687E'
              color='#FEFEE3'
              _hover={{
                bg: '#53687E',
                transform: 'scale(1.2)',
                boxShadow: 'xl'
              }}
            >
              <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/' onClick={() => Auth.logout()}>Logout</BreadcrumbLink>
              </BreadcrumbItem>
            </Box>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    } else {
      return (
        <Flex alignItems={'left'}>
          <Breadcrumb separator=''>
            <Box
              m={[2, 3]}
              as='button'
              height='40px'
              lineHeight='1.2'
              transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
              px='25px'
              borderRadius='5px'
              fontSize='25px'
              bg='#53687E'
              color='#FEFEE3'
              _hover={{
                bg: '#53687E',
                boxShadow: 'xl',
                transform: 'scale(1.2)'
              }}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/signup'>Signup</BreadcrumbLink>
              </BreadcrumbItem>
            </Box>
            <Box
              m={8}
              as='button'
              height='40px'
              lineHeight='1.2'
              transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
              px='25px'
              borderRadius='5px'
              fontSize='25px'
              bg='#53687E'
              color='#FEFEE3'
              _hover={{
                bg: '#53687E',
                transform: 'scale(1.2)',
                boxShadow: 'xl'
              }}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/login'>Login</BreadcrumbLink>
              </BreadcrumbItem>
            </Box>
          </Breadcrumb>
        </Flex>
      )
    }
  }
  return (
    <>
      <Box bg="#52AD9C" px={10} zIndex="100000">
        <Flex h='100px' alignItems={'left'} justifyContent={'space-between'}>
          <Box as={Link} to='/'>
            <HStack>
              <Image
                _hover={{
                  transform: 'scale(1.2)',
                }}
                transition={'background 0.3s ease'}
                h='100px'
                src='https://github.com/cvanbreda91/PatientsPlease/blob/main/client/src/assets/PatientsPlease-Logo-removebg-preview.png?raw=true'
                alt='PatientsPlease'
              />
              <Heading
                as={Link} to='/'
                fontFamily={'Cursive'}>
                PatientsPlease
              </Heading>
            </HStack>
          </Box>
          <Flex alignItems={'left'}>
            {showNavigation()}
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} m={8} bg='#53687E' color='#FEFEE3' _hover={{
                bg: '#53687E',
                transform: 'scale(1.2)',
                boxShadow: 'xl'
              }}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Nav;