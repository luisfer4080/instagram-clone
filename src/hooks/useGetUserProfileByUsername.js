import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase";
import useShowToast from "./useShowToast";

export default function useGetUserProfilebyUsername(username){
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const showToast = useShowToast();

    useEffect(() => {
        
        const getUserProfile = async () => {
            setIsLoading(true);

            try {
                const q = query(collection(database, "user"), where("username", "==", username));
				const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setUserProfile(null);

                let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});

                setUserProfile(userDoc)
            } catch(e) {
                showToast("Error", e.message, "error");
            } finally {
                setIsLoading(false);
            }
        }    

        getUserProfile()

    },[setUserProfile,username])

    return { isLoading, userProfile };
}