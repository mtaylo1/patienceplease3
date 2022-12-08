import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_DRUGS, QUERY_SINGLE_PATIENT, QUERY_DRUG } from '../../utils/queries';
import { UPDATE_DRUGS } from '../../utils/mutations';
import { Box, Input, GridItem, Heading, CardHeader, CardBody, CardFooter, HStack, Button, Card, WrapItem, Flex } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const Drugs = ({ currentDrug }) => {
    const ref = useRef(null)
    // const updatePatientNotes =() =>{
    //     setFormState({drNotes:})
    // }
    const [updateDrugs, { error }] = useMutation(UPDATE_DRUGS);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(ref.current.value)
        // setFormState()
        try {
            const { data } = await updateDrugs({
                variables: { ...formState },
            });
        } catch (e) {
            console.error(e);
        }


    }
    const { loading, data } = useQuery(QUERY_DRUGS);
    const drug = data?.drug || [];
    //   console.log(patient);
    const [formState, setFormState] = useState({});
    return (
        <HStack>
            <GridItem colSpan={3} rowSpan={1}>
                <Box>
                    <Heading>
                        Pharmacy
                    </Heading>
                    <>
                        <WrapItem m={5}>
                            <Card alignItems='center' width='200px' height='200px' m={2}>
                                <CardBody>
                                    <Heading size='sm'>Xanax</Heading>
                                    Xanax is a benzodiazepine...
                                </CardBody>
                                <CardFooter>
                                    <Button mr={3}>
                                        Add!
                                    </Button>
                                    <Button  >
                                        Info!
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card alignItems='center' width='200px' height='200px' m={2}>
                                <CardBody>
                                    <Heading size='sm'>Adderall</Heading>
                                    Adderall is used to treat attention...
                                </CardBody>
                                <CardFooter>
                                    <Button mr={3}>
                                        Add!
                                    </Button>
                                    <Button>
                                        Info!
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card alignItems='center' width='200px' height='200px' m={2}>
                                <CardBody>
                                    <Heading size='sm'>Ibuprofen</Heading>
                                    Ibuprofen is a nonsteroidal anti...
                                </CardBody>
                                <CardFooter>
                                    <Button mr={3}>
                                        Add!
                                    </Button>
                                    <Button>
                                        Info!
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card alignItems='center' width='200px' height='200px' m={2}>
                                <CardBody>
                                    <Heading size='sm'>Melatonin</Heading>
                                    Melatonin is the natural...
                                </CardBody>
                                <CardFooter>
                                    <Button mr={3}>
                                        Add!
                                    </Button>
                                    <Button>
                                        Info!
                                    </Button>
                                </CardFooter>
                            </Card>

                        </WrapItem>
                    </>
                </Box>
            </GridItem>
            <GridItem colSpan={2} rowSpan={1}>
                <Input w='300px' h='300px'>
                </Input>
                <Button mt={2}>Save</Button>
            </GridItem>
        </HStack>
    );
};

export default Drugs;