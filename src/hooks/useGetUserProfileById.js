import { useEffect, useState} from "react";
import { doc , getDoc } from "firebase/firestore";
import { database } from "../firebase";
import useShowToast from "./useShowToast";

const useGetUserProfilebyId = (userId) => {

    const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);
    const showToast = useShowToast();

    useEffect (() => {
        const getUserProfile = async () => {
            setIsLoading(true);
			setUserProfile(null);

            try {
                if(userId){
                    const userRef = doc(database, "user", userId);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setUserProfile(userSnap.data())
                    }else{
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                        return
                    }
                }else{
                    return
                }
            } catch(e) {
                showToast("Error", e.message, "error");
            } finally {
				setIsLoading(false);
			}
        }

        getUserProfile();

    },[setUserProfile, userId])


    return {isLoading, userProfile, setUserProfile}
} 

export default useGetUserProfilebyId