import SideBar from "../components/SideBar/SideBar";
import MorePop from "../components/SideBar/MorePop";
import Footer from '../components/Auth/Footer';
import CreateModal from '../components/CreatePost/CreateModal';
import ProfilePosts from "../components/Profile/ProfilePosts";
import ProfileMenu from "../components/Profile/ProfileMenu";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileImg from "../components/Profile/ProfileImg";
import ProfileList from "../components/Profile/ProfileList";
import ProfileHighlight from "../components/Profile/ProfileHighlight";
import UserNotFound from "../components/Profile/UserNotFound";
import '../css/profile.css';
import { useState } from "react";
import useGetUserProfileByUsername from "../hooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";

export default function Profile () {
    const [show,setShow] = useState(false);
    const [createModal,setCreateModal] = useState(false);
    const { username } = useParams();
    const {isLoading, userProfile} = useGetUserProfileByUsername(username);

    const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound user={userProfile} />;

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
                                        <ProfileHeader profile={userProfile} />
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
                                <ProfileMenu />
                                <ProfilePosts user={userProfile} />
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