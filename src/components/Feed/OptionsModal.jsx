import { UserAuth } from '../../context/AuthContext';
import {
    Avatar,
    Button,
    Divider,
    Flex,
    GridItem,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure,
    useColorModeValue,
    Spacer,
    ModalHeader,
    Box,
    Textarea,
    Input,
    InputRightElement,
    InputGroup,
    FormControl,
} from "@chakra-ui/react";

const OptionsModal = ({isOpen,onClose}) => {
    const { user, logOut } = UserAuth();
    
    const handlelogOut = async () => {
        try {
            await logOut();
            navigate('/');
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} >
            <ModalOverlay />
            <ModalContent>
                <ModalBody bg={useColorModeValue('white', 'gray.700')} paddingTop={"10px"} paddingBottom={"10px"} borderRadius={"15px"}>
                    <Flex
                      gap='4'
                      w={"100%"}
                      h={"60px"}
                      p={"0px"}
                    >
                        <Box
                          overflow={"hidden"}
                          borderColor={"whiteAlpha.300"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w={"100%"}
                        >
                            <Button
                                bg={"transparent"}
                                color={'black'}
                                fontSize={"20px"}
                                onClick={handlelogOut}
                                w={"100%"}
                                cursor={"pointer"}
                                textAlign={"center"}
                                _hover={{}}
                            >
                                Log out
                            </Button>
                        </Box>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default OptionsModal;