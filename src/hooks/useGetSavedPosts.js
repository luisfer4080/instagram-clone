import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { database } from "../firebase";
import useShowToast from "./useShowToast";
import {useState, useEffect} from "react";

const useGetSavedPosts = (postIds) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const [savedPosts,setSavedPosts] = useState([]);

    useEffect(() => {
        const getSavedPosts = async () => {
            setIsLoading(true);
            if(postIds.length === 0) {
                return
            } 
        
            try{
                const q = query(collection(database, 'posts'), where(documentId(), 'in', postIds));
                const querySnapshot = await getDocs(q);

                const userSavedPosts = [];

                querySnapshot.forEach((doc) => {
					userSavedPosts.push({ ...doc.data(), id: doc.id });
				});

                userSavedPosts.sort((a, b) => b.createdAt - a.createdAt);
				setSavedPosts(userSavedPosts);

            }catch(e){
                showToast("Error", e.message, "error");
                setSavedPosts([])
            }finally{
                setIsLoading(false)
            }
        }

        getSavedPosts()

    },[setSavedPosts, postIds, showToast])

    return { isLoading, savedPosts };

}

export default useGetSavedPosts;