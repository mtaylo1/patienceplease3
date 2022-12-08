import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Image,
    Link
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { ReactNode, React } from 'react';
const Logo = (props) => {
    return (
        <HStack>
            <Image
                h='50px'
                src='https://github.com/cvanbreda91/PatientsPlease/blob/main/client/src/assets/PatientsPlease-Logo-removebg-preview.png?raw=true'
                alt='PatientsPlease'
            />
            <Text as={Link} to='/' fontFamily={'Cursive'}>
                PatientsPlease
            </Text>
        </HStack>
    );
};

const SocialButton = ({
    children,
    label,
    href,
}) => {
    return (
        <chakra.button
            bg='#53687E' color='#FEFEE3'
            _hover={{
                bg: '#53687E',
                transform: 'scale(1.2)',
            }}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};
function Footer() {

    // The renderPage method uses a switch statement to render the appropriate current page

    return (
        <Box
            bg="#52AD9C" px={10} bottom="0" width="100%"
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Logo />
                <Text>© 2022 PatientsPlease. All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Twitter'} href={'https://twitter.com/?lang=en-ca'}>
                        <FaTwitter />
                    </SocialButton>
                    <SocialButton label={'YouTube'} href={'https://www.youtube.com/'}>
                        <FaYoutube />
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'https://www.instagram.com/'}>
                        <FaInstagram />
                    </SocialButton>
                    <SocialButton label={'LinkedIn'} href={'https://ca.linkedin.com/'}>
                        <FaLinkedin />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}

export default Footer;
