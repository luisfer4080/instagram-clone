import { Avatar, Box, Button, Flex,Link} from "@chakra-ui/react";
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLogo from "./ProfileLogo";
import SearchModal from "./SearchModal";
import CreateModal from "./CreateModal"
import OptionsModal from "./OptionsModal";
import {
    useDisclosure,
} from '@chakra-ui/react';
import { 
    Home,
    HomeActive,
    Explore,
    ExploreActive,
    SearchLogo,
    SearchLogoActive,
    CreatePostLogo,
    CreatePostLogoActive,
    Options
 } from "../../assets/constants";

const BottomNav = () => {
    const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
    const { isOpen: isSearchOpen , onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
	const { isOpen: isOptionsOpen , onOpen: onOptionsOpen, onClose: onOptionsClose } = useDisclosure();
    const [modalsOpen,setModalsOpen] = useState(false);
    const [activeProfile,setActiveProfile] = useState(false)
    const navigate = useNavigate();

    const handleActive = (id) => {
        switch(id){
            case 1:
                navigate("/feed",{replace: true});
                return;
            case 2:
                return;
            case 3:
                onSearchOpen();
                return;
            case 4:
                onCreateOpen();
                setModalsOpen(true);
                return;
            case 5:
                navigate("/profile",{replace: true}); 
                setActiveProfile(true);
                return;   
            case 6:
                onOptionsOpen();
                return;
            default:
                navigate("/feed",{replace: true});
                return;
        }
    }
    
    return (
        <>
            <Flex w={"full"} h={"50px"} justifyContent={"space-evenly"} position="static">
                <Box p={"12px"} onClick={() => handleActive(1)} cursor={"pointer"} fontSize={18}>
                    <HomeActive />
                </Box>
                <Box p={"12px"} onClick={() => handleActive(2)}>
                    <Explore />
                </Box>
                <Box p={"12px"} onClick={() => handleActive(3)}>
                    <SearchLogoActive />
                </Box>
                <Box p={"12px"} onClick={() => handleActive(4)}>
                    <CreatePostLogoActive /> 
                </Box>
                <Box p={"12px"} onClick={() => handleActive(5)}>
                    { activeProfile  ? <ProfileLogo act={true} /> : <ProfileLogo act={false} />} 
                </Box>
                <Box p={"12px"} onClick={() => handleActive(6)}>
                    <Options />
                </Box>
            </Flex>
            {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={onSearchClose} />}
            {modalsOpen && <CreateModal isOpen={isCreateOpen} onOpen={onCreateOpen} onClose={onCreateClose} handleModalOpen={setModalsOpen} />}
            {isOptionsOpen && <OptionsModal isOpen={isOptionsOpen} onClose={onOptionsClose} />}  
        </>
    )
} 

export default BottomNav;