'use client'

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

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';

import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useRef , useEffect} from 'react';
import useEditProfile from '../../hooks/useEditProfile';
import  usePreviewImg  from '../../hooks/usePreviewImg';

import defaultImg from '../../images/users/Default_pfp.svg.png'; 

export default function EditProfileModal({isOpen, onClose, authUser}) {

    const [inputs,setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        bio :""
    }); 

    const fileRef = useRef(null);
    const { isUpdating, editProfile } = useEditProfile();
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const [defImg, setDefImg] = useState(null); 
    
    useEffect(() =>{
        if (authUser && authUser.profilePictureUrl != ""){
            setDefImg(authUser.profilePictureUrl)
        } else {
            setDefImg(defaultImg)
        }
    },[])

    const updateProfile = async () =>{

        try{
            await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
        }catch(e){
            console.log(e.message)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'md'}
                            bg={useColorModeValue('white', 'gray.700')}
                            rounded={'xl'}
                            boxShadow={'lg'}
                            p={6}
                            my={0}>
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                            User Profile Edit
                            </Heading>
                            <FormControl id="userName">
                                <FormLabel>User profile picture</FormLabel>
                                <Stack direction={['column', 'row']} spacing={6}>
                                    <Center>
                                        <Avatar size="xl" src={selectedFile || defImg}>
                                            <AvatarBadge
                                            as={IconButton}
                                            size="sm"
                                            rounded="full"
                                            top="-10px"
                                            colorScheme="red"
                                            aria-label="remove Image"
                                            icon={<SmallCloseIcon />}
                                            />
                                        </Avatar>
                                    </Center>
                                    <Center w="full">
                                        <Button w="full" onClick={() => fileRef.current.click()}>Edit profile picture</Button>
                                    </Center>
                                    <input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
                                </Stack>
                            </FormControl>
                            <FormControl id="userName" isRequired>
                                <FormLabel>User name</FormLabel>
                                <Input
                                    placeholder="UserName"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                    value={inputs.username || authUser.username}
                                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder="Name"
                                    _placeholder={{ color: 'gray.500' }}
                                    value={inputs.name || authUser.name}
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    type="text"
                                />
                            </FormControl>
                            {authUser.password != "google" && (
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        placeholder="your-email@example.com"
                                        _placeholder={{ color: 'gray.500' }}
                                        value={inputs.email || authUser.email}
                                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                        type="email"
                                    />
                                </FormControl>
                            )}
                            <FormControl id="bio" isRequired>
                                <FormLabel>Bio</FormLabel>
                                <Input
                                    placeholder="Bio"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                    value={inputs.bio || authUser.bio}
                                    onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                                />
                            </FormControl>
                            {authUser.password != "google" && (
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        placeholder="Password"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="password"
                                        value={inputs.password || authUser.password}
                                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    />
                                </FormControl>
                            )}
                            <Stack spacing={6} direction={['column', 'row']}>
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                    bg: 'red.500',
                                    }}>
                                    Cancel
                                </Button>
                                <Button
                                    bg={'rgb(0, 149, 246)'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                    bg: 'blue.500',
                                    }}
                                    isLoading={isUpdating}
                                    onClick={updateProfile}>
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


