import { useState, useEffect } from "react";
import  useGetUserProfilebyId from './useGetUserProfileById';
import { UserAuth } from '../context/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import useShowToast from "./useShowToast";

const useFollowUser = (userId) => {
    const [isUpdating,setIsUpdating] = useState(false);
    const [isFollowing,setIsFollowing] = useState(false);
    const showToast = useShowToast();
    
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const { userProfile } = useGetUserProfilebyId(currentUser?.uid);

    const handleFollowUser = async () => {
        setIsUpdating(true);

        try{
            const currentUserRef = doc(database, "user", userProfile.uid);
			const userToFollowOrUnfollorRef = doc(database, "user", userId);
            await updateDoc(currentUserRef, {
				following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
			});

			await updateDoc(userToFollowOrUnfollorRef, {
				followers: isFollowing ? arrayRemove(userProfile.uid) : arrayUnion(userProfile.uid),
			});

            if (isFollowing) {
                // unfollow

                /*if (userProfile)
					setUserProfile({
						...userProfile,
						followers: userProfile.followers.filter((uid) => uid !== currentUser.uid),
					});*/

                setIsFollowing(false)
            }else{
                // follow

                /*if (userProfile)
					setUserProfile({
						...userProfile,
						followers: [...userProfile.followers, currentUser.uid],
					});
                */

                setIsFollowing(true)
            }

        }catch(e){
            showToast("Error", e.message, "error");
        }finally{
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        if(userProfile){
            const isFollowing = userProfile.following.includes(userId);
            setIsFollowing(isFollowing)
        }
    },[userId,userProfile])

    return {isFollowing,isUpdating,handleFollowUser}

}

export default useFollowUser;