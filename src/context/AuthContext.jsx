import { createContext,useContext} from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState, useEffect } from 'react';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    
    const [user,setUser] = useState();

    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const getCurrent =  () => {
        return user
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe();
        };
    },[])
    
    return (
        <UserContext.Provider value={{createUser, user, logOut, signIn, getCurrent}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}