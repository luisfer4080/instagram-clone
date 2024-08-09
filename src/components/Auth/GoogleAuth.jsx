import {auth} from '../../firebase';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'; 
import { doc, setDoc, getDoc, where } from "firebase/firestore";
import { query } from 'firebase/database';
import { updateProfile } from 'firebase/auth'; 
import {database} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useShowToast from '../../hooks/useShowToast';

export default function GoogleAuth(props){

    const [signInWithGoogle, error] = useSignInWithGoogle(auth);
    const [newUsername,setNewUsername] = useState("");
    const navigate = useNavigate();
    const showToast = useShowToast();

    const handleGoogle = async (e) => {

        e.preventDefault();

        try{
            const userCredentials = await signInWithGoogle();

            if(!userCredentials && error){
                showToast("Error", error, "error");
                return
            }

            const userRef = doc(database, "user", userCredentials.user.uid);
			const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
				// login
                navigate("/feed/")
			} else {
                // sign up
                updateProfile(auth.currentUser,{
                    displayName : userCredentials.user.email.split("@")[0] 
                });

                setNewUsername(userCredentials.user.email.split("@")[0]);

                const q = query(userRef, where("username","==",newUsername));
                const querySnapshot = await getDoc(q);

                if(!querySnapshot.empty){
                    setNewUsername(newUsername+"google")
                }

                const newDoc = {
                    uid: userCredentials.user.uid,
                    email: userCredentials.user.email,
                    username: newUsername,
                    password: "google",
                    name: userCredentials.user.displayName,
                    bio: "",
                    profilePictureUrl: userCredentials.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    saved: [],
                    createdAT: Date.now()
                }

                await setDoc(doc(database, "user", userCredentials.user.uid), newDoc);
                localStorage.setItem("user-info",JSON.stringify(newDoc));

                navigate("/feed/")
                showToast("Success", "You have successfully sign up", "success");
            }
        }catch(e){
            showToast("Error", e.message, "error");
        }

    }

    return (
        
        <div className="google__blue">
            <button className='google__blue__button'  onClick={handleGoogle}>
                {props.prefix} with Google
            </button>
        </div>
    
    )
}