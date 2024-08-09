import { useState, useEffect } from "react";
import  useGetUserProfilebyId from '../hooks/useGetUserProfileById';
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { database } from "../firebase";
import useShowToast from "./useShowToast";

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
    const showToast = useShowToast();
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser?.uid);

    useEffect(() => {
        
        const getSuggestedUsers = async () => {
            setIsLoading(true);

            try {
                const usersRef = collection(database, "user");

                const q = query(
                    usersRef,
                    where("uid", "not-in", [userProfile.uid, ...userProfile.following]),
                    orderBy("uid"),
                    limit(5)
                );

                const querySnapshot = await getDocs(q);
                const users = [];

                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });

                setSuggestedUsers(users)
            } catch(e) {
                showToast("Error", e.message, "error");
            } finally {
                setIsLoading(false)
            }
        }

        if(userProfile) getSuggestedUsers()

    },[userProfile])

    return { isLoading, suggestedUsers };
}

export default useGetSuggestedUsers