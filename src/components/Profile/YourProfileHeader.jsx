import EditProfileModal from "./EditProfileModal";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react';

import { Show } from "@chakra-ui/react"; 

export default function ProfileHeader ({profile}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="profile__user">
            <Show above="sm">
                <a href='#' className="profile__username" role="link" tabIndex="0">
                    <h2 className="profile__username__h2" dir="auto">
                        {profile && profile.username}
                    </h2>
                </a>
            </Show>
            <div className="profile__user__links__container">
                <div className="profile__user__links">  
                    <div className="edit__profile__link">
                        <a href="#" role="link" tabIndex="0" onClick={onOpen}>Edit profile</a>
                    </div>
                    <div className="edit__profile__link">
                        <a href="#" role="link" tabIndex="0">View Archive</a>
                    </div>  
                </div>  
            </div>
            <div className="profile__configuration__container">
                <div className="profile__configuration">
                    <div className="profile__configuration__display">
                        <svg aria-label="Options" className="profile__svg__display" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Options</title>
                            <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                            <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                    </div>
                </div>
            </div>
            {isOpen && <EditProfileModal isOpen={isOpen} onClose={onClose} authUser={profile} />}
        </div>
    )
}