import React, { useState } from 'react';
import PatientList from '../components/PatientList';
import PatientView from '../components/PatientView';
import Appointment from '../components/Appointment';
import Drugs from '../components/Drugs';
import { Box, Grid, Heading, HStack, Button, GridItem } from '@chakra-ui/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Alert,
  AlertIcon,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { ADD_PATIENT } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PATIENT, QUERY_DRUGS } from '../utils/queries';
import Auth from '../utils/auth';

const DoctorsPage = (props) => {
  const initRef = React.useRef();
  const [currentPatient, setPatient] = useState();
  const [currentDrug, setDrug] = useState();

  const [formStatePatient, setFormStatePatient] = useState({ pateientFirstName: '', patientLastName: '', patientEmail: '', drNotes: '' });
  const [formStateDrug, setFormStateDrug] = useState({ drugName: '', dinNumber: '', inventory: '', description: '' });
  const [addPatient, { error }] = useMutation(ADD_PATIENT);
  const { loadingPatient, data } = useQuery(QUERY_PATIENT);
  const patients = data?.patients || [];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormStatePatient({
      ...formStatePatient,
      [name]: value,
    });
  };

  if (loadingPatient) {
    return <div>Loading...</div>;
  }

  const handleChangeDrug = (event) => {
    const { name, value } = event.target;

    setFormStateDrug({
      ...formStateDrug,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPatient({
        variables: { ...formStatePatient },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setPatient({
      pateientFirstName: '', patientLastName: '', patientEmail: '', drNotes: '',
    });
  };


  return (

    <Grid templateRows='repeat(2, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={4}
      h='max-content'>
        <GridItem colSpan={1} rowSpan={2} >
      <Box bg='#5CC8FF' height='750'>
        <HStack>
          <Heading>Patient List</Heading>
          <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Button background="grey">Add Patient</Button>
                </PopoverTrigger>
                <form onSubmit={handleFormSubmit}>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Add New Patient</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <FormControl id="patientFirstName">
                        <FormLabel htmlFor="patientFirstName">First Name</FormLabel>
                        <Input type="patientFirstName"
                          placeholder="Jane"
                          name="patientFirstName"
                          id="patientFirstName"
                          onChange={handleChange} />
                      </FormControl>
                      <FormControl id="patientLastName">
                        <FormLabel mt={1} htmlFor="patientLastName">Last Name</FormLabel>
                        <Input type="patientLastName"
                          placeholder="Doe"
                          name="patientLastName"
                          id="patientLastName"
                          onChange={handleChange} />
                      </FormControl>
                      <FormControl mt={1} id="patientEmail">
                        <FormLabel htmlFor="patientEmail">email</FormLabel>
                        <Input type="patientEmail"
                          placeholder="jane.doe@email.com"
                          name="patientEmail"
                          id="patientEmail"
                          onChange={handleChange} />
                      </FormControl>
                      <Button mt={3}
                        onClick={(onClose)}
                        ref={initRef}
                        type="submit"
                        colorScheme='blue'>Add!</Button>
                    </PopoverBody>
                  </PopoverContent>
                </form>
              </>)}
          </Popover>
        </HStack>
        {error && <Alert status='error'>
          <AlertIcon />
          There was an error processing your request
        </Alert>}
        <PatientList
          patients={patients} currentPatient={currentPatient} setPatient={setPatient} />
      </Box>
      </GridItem>
      <PatientView currentPatient={currentPatient} />
      <Box>
        <Appointment />
      </Box>
      <Box>
        <Drugs />
      </Box>
    </Grid>
  );
};

export default DoctorsPage;
