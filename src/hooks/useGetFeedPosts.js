import { useState, useEffect} from "react"
import  useGetUserProfilebyId from './useGetUserProfileById';
import { UserAuth } from '../context/AuthContext';
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { getCurrent } = UserAuth();
    const [posts, setPosts] = useState([])
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser?.uid);
    const showToast = useShowToast();

    useEffect (() => {
        const getFeedPosts = async () => {
            setIsLoading(true);
			if (userProfile.following.length === 0) {
				setIsLoading(false);
				setPosts([]);
				return;
			}

            const q = query(collection(database, "posts"), where("createdBy", "in", userProfile.following));
			
            try {
                const querySnapshot = await getDocs(q);
				const feedPosts = [];

                querySnapshot.forEach((doc) => {
					feedPosts.push({ id: doc.id, ...doc.data() });
				});

                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            }catch(e){
                showToast("Error", e.message, "error");
            }finally{
                setIsLoading(false);
            }
        }

        if (userProfile) getFeedPosts();
    },[showToast, setPosts, userProfile])

    return { isLoading, posts };
}

export default useGetFeedPosts