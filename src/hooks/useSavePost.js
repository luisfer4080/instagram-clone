import { useState } from "react";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import useGetUserProfilebyId from "./useGetUserProfileById";


export default function useSavePost (postId) {
    const [isUpdating, setIsUpdating] = useState(false);
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser.uid);
    const [isSaved, setIsSaved] = useState(userProfile?.saved.includes(postId));
    const showToast = useShowToast();

    const handleSavePost = async () => {
        if (isUpdating) return;
		if (!userProfile) return showToast("Error", "You must be logged in to save a post", "error");
		setIsUpdating(true);

        if(postId){
            try{
                const userRef = doc(database, "user", currentUser.uid);

                await updateDoc(userRef, {
                    saved: isSaved ? arrayRemove(postId) : arrayUnion(postId),
                });

                setIsSaved(!isSaved);
            }catch(e){
                showToast("Error", e.message, "error");
            }finally{
                setIsUpdating(false);
            }
        }else{
            return
        }
    }

    return { isSaved, handleSavePost, isUpdating };
}