import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase";
import useShowToast from "./useShowToast";

const useGetUserPosts = (userId) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);
            if(!userId) return
        
            try{
                const q  = query(collection(database,"posts"),where("createdBy","==",userId));
                const querySnapshot = await getDocs(q);

                const userPosts = [];

                querySnapshot.forEach((doc) => {
					userPosts.push({ ...doc.data(), id: doc.id });
				});

                userPosts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(userPosts);

            }catch(e){
                showToast("Error", e.message, "error");
                setPosts([])
            }finally{
                setIsLoading(false)
            }
        }

        getPosts()

    },[setPosts, userId, showToast])

    return { isLoading, posts };
}

export default useGetUserPosts;