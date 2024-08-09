import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase";

export default function useSearchUser(){
    const [isLoading,setIsLoading] = useState(false);
    const [user,setUser] = useState(null);
    const showToast = useShowToast();
    
    const getUserProfile = async (username) => {
        setIsLoading(true);
		setUser(null);

        try{
            const q = query(collection(database,"user"),where("username","==",username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) return showToast("Error", "User not found", "error");

            querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});

        } catch(e) {
            showToast("Error", e.message, "error");
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, getUserProfile, user, setUser }

}