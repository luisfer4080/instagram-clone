
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LogInRedirect({children}) {
    const {user} = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {  
        if(user !== null && user !== undefined){
            navigate("/feed",{replace: true})
        }    
    },[user,navigate]) 

    return children

}