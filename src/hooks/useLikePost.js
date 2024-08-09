import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import useGetUserProfilebyId from "./useGetUserProfileById";
import useShowToast from "./useShowToast";

const useLikePost = (post) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser.uid);
    const [likes, setLikes] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(post.likes.includes(userProfile?.uid));
    const showToast = useShowToast();

    const handleLikePost = async () => {
        if (isUpdating) return;
		if (!userProfile) return showToast("Error", "You must be logged in to like a post", "error");
		setIsUpdating(true);

        try{
            const postRef = doc(database, "posts", post.id);

            await updateDoc(postRef, {
				likes: isLiked ? arrayRemove(userProfile.uid) : arrayUnion(userProfile.uid),
			});

            setIsLiked(!isLiked);
			isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
        }catch(e){
            showToast("Error", e.message, "error");
        }finally{
            setIsUpdating(false);
        }
    }

    return { isLiked, likes, handleLikePost, isUpdating };
}

export default useLikePost;