import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { doc, updateDoc, getDocs ,collection, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { database, storage, auth } from "../firebase";
import { useUpdateEmail } from 'react-firebase-hooks/auth';
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import  useGetUserProfilebyId from './useGetUserProfileById';
import useShowToast from "./useShowToast";

const useEditProfile = () => {
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const [updateEmail] = useUpdateEmail(auth);
    const [updatePassword] = useUpdatePassword(auth);
    const [emailExist,setEmailExist] = useState(false);
    const [isUpdating,setIsUpdating] = useState(false);
    const {userProfile} = useGetUserProfilebyId(currentUser.uid);
    const showToast = useShowToast();

    const editProfile =  async (inputs,selectedFiles) => {
        if(isUpdating || !userProfile){
            return
        }

        setIsUpdating(true);
    
        const storageRef = ref(storage, `profilePics/${userProfile.uid}`);
		const userDocRef = doc(database, "user", userProfile.uid);

        let URL = "";

        try{
            if(selectedFiles){
                await uploadString(storageRef, selectedFiles, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${userProfile.uid}`));
            }

            const q = query(collection(database, "user"), where("email", "==", inputs.email));

            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty){
                setEmailExist(true)
            }

            if(!emailExist && (inputs.email != "")){
                const successEmail = await updateEmail(inputs.email);
                if (successEmail) {
                    console.log('Updated email address');
                }
            }

            if(inputs.password != ""){
                const successPassword = await updatePassword(inputs.password);
                if (successPassword) {
                    console.log('Updated password');
                }
            }
          
            const updatedUser = {
				...userProfile,
				name: inputs.name || userProfile.name,
				username: inputs.username || userProfile.username,
                email: inputs.email || userProfile.email,
                password: inputs.password || userProfile.password,
				bio: inputs.bio || userProfile.bio,
				profilePictureUrl: URL || userProfile.profilePictureUrl,
			};

            await updateDoc(userDocRef, updatedUser);
            
            setEmailExist(false);
            setPasswordExist(false)

        }catch(e){
            showToast("Error", e.message, "error");
        }
    }

    return { isUpdating , editProfile }
}

export default useEditProfile;