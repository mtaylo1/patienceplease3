import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import PatientShop from '../PatientShop'
import { QUERY_PATIENT, QUERY_SINGLE_PATIENT } from '../../utils/queries';
import { UPDATE_PATIENT } from '../../utils/mutations';
import { Box, Textarea, GridItem, Heading, HStack, Button } from '@chakra-ui/react'

const PatientView = ({ currentPatient }) => {
  const ref = useRef(null)
  // const updatePatientNotes =() =>{
  //     setFormState({drNotes:})
  // }
  const [updatePatientNotes, { error }] = useMutation(UPDATE_PATIENT);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(ref.current.value)
    // setFormState()
    try {
      const { data } = await updatePatientNotes({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    console.log(formState.drNotes)

  }
  const { loading, data } = useQuery(QUERY_SINGLE_PATIENT, {
    variables: { id: currentPatient }
  });
  const patient = data?.patient || [];
  //   console.log(patient);
  const [formState, setFormState] = useState({ drNotes: patient.drNotes });
  return (
    <GridItem colSpan={3} rowSpan={1}>
      <Box>
        <Heading size='lg'> Patient Name: {patient.patientFirstName} {patient.patientLastName}</Heading>
        <Heading mt={3} size='md'>Notes </Heading>
        <form onSubmit={handleFormSubmit}>
          <Textarea size='3xl' h="200px" name="notes" value={patient.drNotes} ref={ref}></Textarea><br />
          <Button type="submit" mt={2}>Update Notes</Button>
        </form>
      </Box>
    </GridItem>






  );
};

export default PatientView;