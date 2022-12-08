import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PATIENT, QUERY_SINGLE_PATIENT } from '../../utils/queries';
import { UPDATE_PATIENT } from '../../utils/mutations';
import { Box, Input, GridItem, Heading, HStack, Button } from '@chakra-ui/react'


const Appointment = ({ currentPatient }) => {
    const ref = useRef(null)
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


    }
    const { loading, data } = useQuery(QUERY_SINGLE_PATIENT, {
        variables: { id: currentPatient }
    });
    const patient = data?.patient || [];
    //   console.log(patient);
    const [formState, setFormState] = useState({ drNotes: patient.drNotes });
    return (
        <GridItem colSpan={1} rowSpan={1} mr={3}>
            <Box>
                <Heading mt={10} size='md'>Book Appointment</Heading>
                <form>
                    <Input type="datetime-local" />
                    <Button mt={2}>Add</Button>
                </form>

            </Box>
        </GridItem>






    );
};

export default Appointment;