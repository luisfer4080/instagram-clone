import SideBar from "../components/SideBar/SideBar";
import MorePop from "../components/SideBar/MorePop";
import Footer from '../components/Auth/Footer';
import CreateModal from '../components/CreatePost/CreateModal';
import ProfilePosts from "../components/Profile/ProfilePosts";
import YourProfileMenu from "../components/Profile/YourProfileMenu"; 
import YourProfileHeader from "../components/Profile/YourProfileHeader";
import ProfileImg from "../components/Profile/ProfileImg";
import ProfileList from "../components/Profile/ProfileList";
import ProfileHighlight from "../components/Profile/ProfileHighlight";
import SavedPosts from "../components/Profile/SavedPosts";
import BottomNav from "../components/Feed/BottomNav";
import { UserAuth } from '../context/AuthContext';
import  useGetUserProfilebyId from '../hooks/useGetUserProfileById';
import '../css/profile.css';
import { useState } from "react";
import { Box, Flex, Show, Text } from "@chakra-ui/react";

export default function Profile(){
    
    const [show,setShow] = useState(false);
    const [activeMenu,setActiveMenu] = useState(1)
    const [createModal,setCreateModal] = useState(false);
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser?.uid);
    const {user} = UserAuth();
    if(user === null) return null

    const showMenu = () => {
        if (show || createModal){
            setShow(false);
            setCreateModal(false)
        }

        return
    }

    const handlerMenu = (data) => {
        if (data == "esconder"){
            setShow(false)
        } else if(data == "mostrar"){
            setShow(true)
        }

        return
    }

    const handlerCreateModal = (data) => {
        if (data == "esconder"){
            setCreateModal(false)
        } else if(data == "mostrar"){
            setCreateModal(true)
        }

        return
    }

    return(
        <>
            <div onClick={showMenu}>
                <Show above="sm">
                    <Show above="sm">
                        <SideBar menu={handlerMenu} create={handlerCreateModal} show={show} showCreate={createModal} />
                    </Show>
                    <Box ml={"310px"} w={"935px"} p={"30px 20px 0px 20px"} mr={"65px"} mb={"30px"}>
                        <Flex>
                            <ProfileImg profile={userProfile} />    
                            <Box>
                                <Box mb={"20px"}>
                                    <YourProfileHeader profile={userProfile} />  
                                </Box>
                                <Box>
                                    <ProfileList profile={userProfile} />
                                </Box>
                                <Text fontFamily={"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"} fontWeight={"600"} fontSize={"14px"}>
                                    {userProfile && userProfile.name}
                                </Text>
                                <Text fontFamily={"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"} fontWeight={"300"} fontSize={"12px"} color={"gray"}>
                                    {userProfile && userProfile.bio}
                                </Text>
                            </Box>
                        </Flex> 

                        <Box mt={"44px"}>
                            <ProfileHighlight />
                        </Box>
                        
                        <Box pr={"20px"}>
                            <YourProfileMenu activeMenu={activeMenu} activeMenuHandler={setActiveMenu} />
                        </Box>

                        {(activeMenu === 1) && <ProfilePosts user={userProfile} />}
                        {(activeMenu === 2) && <SavedPosts user={userProfile} />}
                        <Footer />
                    </Box>
                    <div>
                        {show && <MorePop />}
                    </div>
                    <div>
                        {createModal && <CreateModal />}
                    </div>
                </Show>
                <Show below="sm">
                    <Flex>
                        <ProfileImg profile={userProfile} />    
                        <Box w={"70%"} mt={"25px"}>
                            <ProfileList profile={userProfile} />
                        </Box>
                    </Flex>
                    <Text fontFamily={"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"} fontWeight={"600"} fontSize={"14px"} ml={"10px"}>
                        {userProfile && userProfile.name}
                    </Text>
                    <Text fontFamily={"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"} fontWeight={"300"} fontSize={"12px"} color={"gray"} ml={"10px"}>
                        {userProfile && userProfile.bio}
                    </Text>
                    <Box mt={"15px"}>
                        <YourProfileHeader profile={userProfile} />  
                    </Box>
                    <Box>
                        <YourProfileMenu activeMenu={activeMenu} activeMenuHandler={setActiveMenu} />
                    </Box>
                    {(activeMenu === 1) && <ProfilePosts user={userProfile} />}
                    {(activeMenu === 2) && <SavedPosts user={userProfile} />}
                    
                    <BottomNav />
                   
                </Show>
            </div>

        </>
    )
}



