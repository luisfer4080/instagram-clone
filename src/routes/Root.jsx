import LoginForm from '../components/Auth/LoginForm';
import Footer from '../components/Auth/Footer';
import { UserAuth } from '../context/AuthContext';
import { Flex,Container,Image,Box,Text, Show } from '@chakra-ui/react';
import Phone from '../images/static/home-phones.png'
 
export default function Root(){

    const {user} = UserAuth();
    if(user !== null) return null

 
    return(
        <>
            <Container minHeight={"100vh"} maxW={"95%"} centerContent>
                <Text
                    ml={2}
                    pt={"20px"}
                    fontSize="sm"
                    fontWeight="bold"
                    color="pink.800"
                >
                    Instagram Clone by Luis Marquez
                </Text>

                <Flex mt={"32px"}>
                    <Show above='sm'>
                        <Image src={Phone} alt="root__phone" w={"468.32px"} h={"634.15px"} objectFit={"cover"} flexBasis={"380.32px"} backgroundPosition={"-46px 0"} />
                    </Show>
                    <Box w={"350px"} justifyContent={"center"} alignItems={"center"}>
                        <LoginForm />
                    </Box>
                </Flex>
                <Box p={"0px 16x 0px 16px"}>
                    <Footer />
                </Box>
            </Container>
        </>
    )   
}