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
import { UserAuth } from '../context/AuthContext';
import  useGetUserProfilebyId from '../hooks/useGetUserProfileById';
import '../css/profile.css';
import { useState } from "react";

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
            <div className="profile__page" onClick={showMenu}>
                <SideBar menu={handlerMenu} create={handlerCreateModal} show={show} showCreate={createModal} />
                <div className="profile__container">
                    <div className="profile">
                        <div className="profile__flex">
                            <div className="profile__padding">
                                <div className="profile__header">
                                   <ProfileImg profile={userProfile} />  
                                    <div className="profile__info">
                                        <YourProfileHeader profile={userProfile} />
                                        <div className="profile__margin"><div></div></div>
                                        <ProfileList profile={userProfile} />
                                        <div className="profile__name">
                                            <div className="profile__name__container">
                                                <span className="profile__name__span">{userProfile && userProfile.name}</span>
                                            </div>
                                            <div className="profile__name__padding"></div> 
                                        </div>
                                        <div className="profile__name">
                                            <div className="profile__name__container">
                                                <span className="profile__bio__span">{userProfile && userProfile.bio}</span>
                                            </div>
                                            <div className="profile__name__padding"></div> 
                                        </div>
                                    </div>
                                </div>
                                <ProfileHighlight />
                                <YourProfileMenu activeMenu={activeMenu} activeMenuHandler={setActiveMenu} />
                                {(activeMenu === 1) && <ProfilePosts user={userProfile} />}
                                {(activeMenu === 2) && <SavedPosts user={userProfile} />}
                            </div>
                        </div>   
                    </div>
                    <div className="root__footer__container">
                        <Footer />
                    </div>
                </div>
                <div>
                    {show && <MorePop />}
                </div>
                <div>
                    {createModal && <CreateModal />}
                </div>
            </div>
        </>
    )
}



