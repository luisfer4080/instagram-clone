import '../App.css';
import SideBar from '../components/SideBar/SideBar';
import Feed from '../components/Feed/Feed';
import Footer from '../components/Feed/Footer';
import MorePop from '../components/SideBar/MorePop';
import CreatePost from '../components/CreatePost/CreateModal';
import useGetUserProfileById from '../hooks/useGetUserProfileById';
import BottomNav from '../components/Feed/BottomNav';
import { useEffect, useState, useCallback } from "react";
import { UserAuth } from '../context/AuthContext'
import { Box, Show } from '@chakra-ui/react';

export default function UserFeed(){
    const {user} = UserAuth();
    const [show,setShow] = useState(false);
    const [createModal,setCreateModal] = useState(false);
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfileById(currentUser?.uid);
    const [home,setHome] = useState(false);
    
    const handlerCreateModal = useCallback((data) => {
        if (data == "esconder"){
            setCreateModal(false);
            setHome(true)

        } else if(data == "mostrar"){
            setCreateModal(true);
            setHome(false)
        }

        return
    },[createModal])
  
    
    if(user === null) return null

    const showMenu = event => {
        if (show){
            setShow(false)
        }else if(createModal){
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

    return (
        <>
            <div id="userFeedClick" className='user__feed__container' >
                <Show above='sm'>
                    <div className="header">
                        <SideBar menu={handlerMenu} create={handlerCreateModal} show={show} showCreate={createModal} home={home} setHome={setHome} />
                    </div>
                </Show>
                <div className="feed__footer__size">
                    <div className="feed__footer__flex">
                        <div className="feed__footer__display">
                            <div className="feed__footer">
                                <Feed userData={userProfile} />
                                <Show above='sm'>
                                    <Footer userData={userProfile} />
                                </Show>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {show && <MorePop />}
                </div>
                <div>
                    {createModal && <CreatePost create={handlerCreateModal} />}
                </div>
            </div>
            <Show below='sm'>
                <BottomNav />
            </Show>
        </>
    )
}

