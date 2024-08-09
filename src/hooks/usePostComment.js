import { useState } from "react";
import useShowToast from "./useShowToast";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import  useGetUserProfilebyId from './useGetUserProfileById';

export default function usePostComment(){
    const [isCommenting, setIsCommenting] = useState(false);
	const showToast = useShowToast();

    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser.uid);

    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
		if (!currentUser) return showToast("Error", "You must be logged in to comment", "error");
        setIsCommenting(true);

		const newComment = {
			comment,
			createdAt: Date.now(),
			createdBy: userProfile.uid,
			postId,
		};

        try{
            await updateDoc(doc(database, "posts", postId), {
				comments: arrayUnion(newComment),
			});
        }catch(e){
            showToast("Error", e.message, "error");
        }finally{
            setIsCommenting(false);
        }
    }

    return { isCommenting, handlePostComment };
} 