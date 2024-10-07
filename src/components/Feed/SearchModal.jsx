import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from "../Feed/SuggestedUser";
import { useRef } from 'react';

const SearchModal = ({isOpen,onClose}) =>{
    const { user, isLoading, getUserProfile, setUser } = useSearchUser();
    const searchRef = useRef(null);

    const handleSearchUser = (e) => {
        e.preventDefault();
        getUserProfile(searchRef.current.value);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
                <ModalOverlay />
                <ModalContent bg={useColorModeValue('gray.50', 'gray.800')} border={"1px solid gray"} maxW={"400px"}>
                    <ModalHeader>Search User</ModalHeader> 
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSearchUser}>
                            <FormControl>
                                <FormLabel>username</FormLabel>
                                <Input placeholder='Ej: luisEx' ref={searchRef}/>
                            </FormControl>
                            <Flex w={"full"} justifyContent={"flex-end"}>
                                <Button type='submit'ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
                                    Search
                                </Button>
                            </Flex>
                        </form>
                        {user && <SuggestedUser user={user} setUser={setUser} />}
                    </ModalBody>                                              
                </ModalContent>
            </Modal>
    )
}

export default SearchModal;