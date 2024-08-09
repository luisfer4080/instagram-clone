import { useEffect, useState, useRef } from 'react';
import { UserAuth } from '../../context/AuthContext';
import useGetUserProfilebyId from "../../hooks/useGetUserProfileById";
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from "../Feed/SuggestedUser";
import Brand from './Brand';
import Explore from './Explore';
import Reels from './Reels';
import Messages from './Messages';
import Notificacions from './Notificacions';
import Create from './Create';
import Profile from './Profile';
import More from './More';
import Home from './Home';
import Search from './Search';
import '../../css/header__menu.css';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Button,
    useColorModeValue
  } from '@chakra-ui/react';


const barElements = [
    {
        "id":1,
        "active": true
    },
    {
        "id":2,
        "active": false
    },
    {
        "id":3,
        "active": false
    },
    {
        "id":4,
        "active": false
    },
    {
        "id":5,
        "active": false
    },
    {
        "id":6,
        "active": false
    },
    {
        "id":7,
        "active": false
    },
    {
        "id":8,
        "active": false
    },
    {
        "id":9,
        "active": false
    }
]

export default function SideBar(props){

    const [show,setShow] = useState(false);
    const [create, setCreate] =useState(false);
    const [showText,setShowText] = useState(true);
    const [activeArray,setActiveArray] = useState(barElements);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser?.uid);
    const { user, isLoading, getUserProfile, setUser } = useSearchUser();
    const searchRef = useRef(null);

    const handleSearchUser = (e) => {
        e.preventDefault();
        getUserProfile(searchRef.current.value);
    }

    useEffect(() => {
        props.menu("esconder");
        props.create("esconder");

        if(props.home){
            handdleActive(1);
            props.setHome(false)
        }
    },[])

    useEffect(() => {
        if (!props.show){
            //setShow(false)
            props.menu("esconder")
        }
    },[props.show])

    useEffect(() => {
        if (!props.showCreate){
            //setShow(false)
            props.create("esconder")
        }
    },[props.showCreate])

    const handleActiveArray = (id) => {
        setActiveArray(a => a.map(act => {
            return act.id === id ? 
                {...act, active: true} :
                {...act, active: false}
        }))
    }

    const handdleActive = (elem) => {

        switch(elem) {
            case 1:
                handleActiveArray(elem);
                setShowText(true);
                return
            case 2:
                handleActiveArray(elem);
                setShowText(false);
                onOpen();
                return
            case 3:
                handleActiveArray(elem);
                setShowText(true);
                return
            case 4:
                handleActiveArray(elem);
                setShowText(true);
                return
            case 5:
                handleActiveArray(elem);
                setShowText(false);
                return
            case 6:
                handleActiveArray(elem);
                setShowText(false);
                return
            case 7:
                handleActiveArray(elem);
                setShowText(true);
                
                if (create) {
                    setCreate(false);
                    props.create("esconder")
                }else{
                    setCreate(true);
                    props.create("mostrar")
                }
                return
            case 8:
                handleActiveArray(elem);
                setShowText(true);
                return
            case 9:
                handleActiveArray(elem);
                setShowText(true);

                if (show) {
                    setShow(false);
                    props.menu("esconder")
                }else{
                    setShow(true);
                    props.menu("mostrar")
                }
                return
            default:
                handleActiveArray(elem);
                setShowText(true);
                return
        }
    }

    return (
        <>
            <header className='header__container'>
                <div className="header__inh" tabIndex="-1">
                    <div className="header__flex">
                        <div className="header__border">
                            <div className={`${showText ? "header__padding" : "header__padding__small"}`}>
                                <Brand showText={showText} />
                                <div className="header__menu__container">
                                    <Home handdleActive={handdleActive} active={activeArray[0].active} showText={showText}/>
                                    <Search handdleActive={handdleActive} active={activeArray[1].active} showText={showText}/>
                                    <Explore handdleActive={handdleActive} active={activeArray[2].active} showText={showText} />
                                    <Reels handdleActive={handdleActive} active={activeArray[3].active} showText={showText} />
                                    <Messages handdleActive={handdleActive} active={activeArray[4].active} showText={showText} />
                                    <Notificacions handdleActive={handdleActive} active={activeArray[5].active} showText={showText} />
                                    <Create handdleActive={handdleActive} active={activeArray[6].active} showText={showText} />
                                    <Profile handdleActive={handdleActive} active={activeArray[7].active} showText={showText} userProfile={userProfile}/>
                                </div> 
                                <More handdleActive={handdleActive} active={activeArray[8].active} showText={showText} />
                            </div>
                        </div>
                    </div>
                </div>
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
            </header>
        </>
    )

} 