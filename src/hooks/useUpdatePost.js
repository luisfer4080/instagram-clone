import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import useShowToast from "./useShowToast";

const useUpdatePost = () =>{
    const [isUpdating, setIsUpdating] = useState(false);
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const showToast = useShowToast();

    const UpdatePost = async (post,inputs) => {
        if (isUpdating) return;
		if (!currentUser) return showToast("Error", "You must be logged in to update a post", "error");
        if ((inputs.caption === "") && (inputs.location === "") && (inputs.accesibility === "")) {
            return showToast("Error", "There are not any inputs to update", "error");
        }
		setIsUpdating(true);

        try{
            const postRef =doc(database,"posts",post.id);

            const updatedPost = {
				...post,
				location: inputs.location || post.location,
				caption: inputs.caption || post.caption,
                accesibility: inputs.accesibility || post.accesibility,
			};

            await updateDoc(postRef,updatedPost);

            showToast("Success", "Post Updated successfully refesh the page to see tha changes", "success");
        }catch(e){
            showToast("Error", e.message, "error");
        }finally{
            setIsUpdating(false); 
        }
    }

    return { isUpdating , UpdatePost }
}

export default useUpdatePost;